import {
  Component,
  Input,
  ViewEncapsulation,
  Optional,
  Self,
  Inject,
  LOCALE_ID,
  Injector,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, catchError, map, takeUntil } from 'rxjs/operators';
import { HttpFactoryService, HTTP_SERVICE, HttpBaseModel, HttpMethod } from '@dongkap/do-core';
import { SelectParamModel, SelectResponseModel } from './models/select.model';
import { ContentSelectDirective } from './directive/content-select.directive';
import { ValueAccessorDirective } from '../base/value-accessor.component';

@Component({
  selector: 'do-select',
  styleUrls: ['./do-select.component.scss'],
  templateUrl: './do-select.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoSelectComponent extends ValueAccessorDirective<any> implements OnDestroy {
    @Input() placeholder: string;
    @Input() colLabel: number = 3;
    @Input() colInput: number = 9;
    @Input() items: SelectResponseModel[] = [];
    @Input() multiple: boolean = false;
    @Input() loading: boolean = false;
    @Input() addTag: boolean = false;
    @Input() closeOnSelect: boolean = true;
    @Input() clearable: boolean = true;
    @Input() searchable: boolean = true;
    @Input() hideSelected: boolean = true;
    @Input() minTermLength: number = 2;
    @Input() maxTermLength: number = 50;
    @Input() api: HttpBaseModel;
    @Input() limit: number = 50;
    @Input() offsetNextLoad: number = this.limit - 35;
    @Input() queryParam: SelectParamModel[];
    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClear: EventEmitter<boolean> = new EventEmitter<boolean>();
    // @ViewChild('select', {static: false}) select: NgSelectComponent;
    @ContentChild(ContentSelectDirective, {static: false, read: TemplateRef}) contentTemplate;
    public notFoundText: string = 'select.notfound';
    public typeToSearchText: string = 'select.typesearch';
    public virtualScroll: boolean = true;
    public paramSearch: any = { value: this.minTermLength };
    public typeahead$: Subject<string> = new Subject<string>();
    protected http: HttpFactoryService;
    private destroy$: Subject<any> = new Subject<any>();
    private total: number = 0;
    private totalRecord: number = 0;
    private cdref: ChangeDetectorRef;
    public _value: any;

    constructor(
      @Optional() @Self() ngControl: NgControl,
      @Inject(LOCALE_ID) public locale: string,
      public injector: Injector) {
      super(ngControl, locale);
      this.http = injector.get(HTTP_SERVICE);
      this.cdref = injector.get(ChangeDetectorRef);
    }

    get value(): any { return this._value; }

    set value(value: any) {
      if (this._value !== value) {
          this._value = value;
          this.onChange(value);
          this.onSelect.emit(value);
          const control = this.ngControl.control;
          if (control) {
              control.updateValueAndValidity();
              control.markAsTouched();
              control.markAsDirty();
          }
      }
    }

    onInit(): void {
      this.paramSearch = { value: this.minTermLength };
      if (this.api) {
        this.fetchSearch().subscribe((items: SelectResponseModel[]) => {
          this.fetchMore(items);
        });
      }
    }

    ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
      this.destroy$.unsubscribe();
      this.typeahead$.next(null);
      this.typeahead$.complete();
      this.typeahead$.unsubscribe();
    }

    onOpen(): void {
      if (this.api) {
        if (this.loading) { return; }
        this.total = 0;
        this.items = [];
        if (!this.searchable) {
          this.fetchNone().subscribe((items: SelectResponseModel[]) => {
            this.fetchMore(items);
          });
        }
      }
    }

    onClose(): void {
      if (this.api) {
        this.reset();
      }
    }

    onScroll({ end }, search: string): void {
      if (!this.loading) {
        if ((Number(end) + this.offsetNextLoad) >= this.total && this.total > 0  && this.total < this.totalRecord) {
          if (this.searchable && search) {
            this.typeahead$.next(search);
          } else {
            this.fetchNone().subscribe((items: SelectResponseModel[]) => {
              this.fetchMore(items);
            });
          }
        }
      }
    }

    onScrollToEnd(search: string): void {
      if (!this.loading) {
        if (this.total < this.totalRecord) {
          if (this.searchable && search) {
            this.typeahead$.next(search);
          } else {
            this.fetchNone().subscribe((items: SelectResponseModel[]) => {
              this.fetchMore(items);
            });
          }
        }
      }
    }

    doClear(): void {
      this.onClear.emit(true);
    }

    private reset(): void {
      this.loading = false;
      this.total = 0;
      if (this.api) {
        this.items = [];
      }
    }

    private fetchMore(items: SelectResponseModel[]): void {
      this.items = [...this.items, ...items];
      this.cdref.detectChanges();
      this.loading = false;
    }

    private fetchSearch(): Observable<SelectResponseModel[]> {
      return this.typeahead$.pipe(
        switchMap((term: string) => {
          if (term) {
            if (term.length > this.maxTermLength) {
              return of([]);
            }
            return this.getRequest(this.total, term);
          } else {
            return of([]);
          }
        })).pipe(takeUntil(this.destroy$));
    }

    private fetchNone(): Observable<SelectResponseModel[]> {
      return this.getRequest(this.total).pipe(takeUntil(this.destroy$));
    }

    private getRequest(offset?: number, search?: string): Observable<SelectResponseModel[]> {
      let body: any;
      if (this.api.method === HttpMethod.POST) {
        body = {
          offset: offset ? offset : 0,
          limit: this.limit,
          keyword : {
            _label: search,
          },
        };
        if (this.queryParam) {
          this.queryParam.forEach((result: SelectParamModel) => {
            body['keyword'][result.key] = result.value;
          });
        }
      }
      this.loading = true;
      return this.http.HTTP_AUTH(this.api, body)
        .pipe(
          map((response: any) => {
            this.totalRecord = Number(response.totalRecord);
            this.total = this.total + Number(response.totalFiltered);
            return response['data'] as SelectResponseModel[];
          }),
          catchError(() => of([])));
    }

    onKeyDown(event: KeyboardEvent, term: string) {
      if (event.key) {
        if (
          ['DELETE', 'BACKSPACE', 'TAB', 'ESCAPE', 'ENTER', 'DECIMAL POINT', 'PERIOD', 'DASH'].indexOf(event.key.toUpperCase()) !== -1 ||
          (event.key.toUpperCase() === 'A' && event.ctrlKey === true) || // Allow: Ctrl+A
          (event.key.toUpperCase() === 'C' && event.ctrlKey === true) || // Allow: Ctrl+C
          (event.key.toUpperCase() === 'V' && event.ctrlKey === true) || // Allow: Ctrl+V
          (event.key.toUpperCase() === 'X' && event.ctrlKey === true) || // Allow: Ctrl+X
          (event.key.toUpperCase() === 'A' && event.metaKey === true) || // Cmd+A (Mac)
          (event.key.toUpperCase() === 'C' && event.metaKey === true) || // Cmd+C (Mac)
          (event.key.toUpperCase() === 'V' && event.metaKey === true) || // Cmd+V (Mac)
          (event.key.toUpperCase() === 'X' && event.metaKey === true) || // Cmd+X (Mac)
          (event.key.toUpperCase() === 'END') ||
          (event.key.toUpperCase() === 'HOME') ||
          (event.key.toUpperCase() === 'ARROWLEFT') ||
          (event.key.toUpperCase() === 'ARROWRIGHT') ||
          (event.key.toUpperCase() === 'ARROWDOWN') ||
          (event.key.toUpperCase() === 'ARROWUP') || (!event.key.match(/[!@#$%^&*()?":{}|<>\[\];\\=~`]/g))) {
            if (!(event.ctrlKey === true ||
              event.metaKey === true ||
              event.altKey === true ||
              (event.key.toUpperCase() === 'END') ||
              (event.key.toUpperCase() === 'HOME') ||
              (event.key.toUpperCase() === 'ARROWLEFT') ||
              (event.key.toUpperCase() === 'ARROWRIGHT') ||
              (event.key.toUpperCase() === 'ARROWDOWN') ||
              (event.key.toUpperCase() === 'ARROWUP'))) {
              this.reset();
            }
            if (term) {
              if (term.length > this.maxTermLength) {
                return false;
              }
            }
            return true;
        }
      }
      return false;
    }

}
