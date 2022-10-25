import {
  Component,
  Input,
  ViewEncapsulation,
  Inject,
  LOCALE_ID,
  Injector,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ColumnMode, SelectionType, SortType, DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup } from '@angular/forms';
import { DatatableColumn, DatatableFilter, Keyword, Page, Sort } from '@dongkap/do-shared';
import { HttpBaseModel, HttpFactoryService, HTTP_SERVICE } from '@dongkap/do-core';
import { LayoutService } from '@dongkap/do-theme';

@Component({
  selector: 'do-panic-datatable',
  styleUrls: ['./do-panic-datatable.component.scss'],
  templateUrl: './do-panic-datatable.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoPanicDatatableComponent implements OnInit, OnDestroy {
  @Input() rows: any[] = [];
  @Input() columns: DatatableColumn[] = [];
  @Input() filters: DatatableFilter[] = [];
  @Input() selected: any[] = [];
  @Input() limit: number | undefined = 10;
  @Input() count: number = 0;
  @Input() offset: number = 0;
  @Input() externalPaging: boolean = false;
  @Input() externalSorting: boolean = false;
  @Input() loadingIndicator: boolean = false;
  @Input() scrollbarH: boolean = true;
  @Input() scrollbarV: boolean = false;
  @Input() reorderable: boolean = true;
  @Input() sortType: SortType = SortType.single;
  @Input() messages: any;
  @Input() selectionType: SelectionType;
  @Input() columnMode: ColumnMode = ColumnMode.force;
  @Input() headerHeight: any = 40;
  @Input() footerHeight: any = 'auto';
  @Input() rowHeight: number | 'auto' | ((row?: any) => number) = 'auto';
  @Input() column: boolean = true;
  @Input() footer: boolean = true;
  @Input() api: HttpBaseModel;
  @Input() startWithOpenData: boolean = true;
  @Input() filterEvent: boolean = false;
  @Input() formGroupFilter: FormGroup;
  @Output() buttonCell: EventEmitter<any> = new EventEmitter<any>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() activate: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('datatable', {static: false}) datatable: DatatableComponent;
  @Input() set filterFn(keyword: Keyword) {
    this.keywordParam = keyword;
    this._keyword = keyword;
    this.count = 0;
    this.offset = 0;
  }

  public keywordParam: Keyword;
  public _keyword: Keyword;
  protected http: HttpFactoryService;
  private destroy$: Subject<any> = new Subject<any>();
  private cdref: ChangeDetectorRef;
  private sort: Sort;
  private pageOffset: number = 0;

  constructor(@Inject(LOCALE_ID) public locale: string,
    private layout: LayoutService,
    public injector: Injector) {
      this.http = injector.get(HTTP_SERVICE);
      this.cdref = injector.get(ChangeDetectorRef);
  }

  ngOnInit(): void {
    if (this.startWithOpenData) {
      this.fetch();
    }
    this.layout.onChangeLayoutSize().subscribe(() => {
      this.datatable.recalculate();
      this.cdref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  fetch(): void {
    if (this.api) {
      this.externalPaging = true;
      this.externalSorting = true;
      this.getRequest().subscribe(rows => {
        this.rows = rows;
        this.cdref.detectChanges();
      });
    }
  }

  onSort(order: any): void {
    if (order) {
      if (Array.isArray(order.sorts)) {
        order.sorts.forEach(sort => {
          if (sort['dir'] === 'asc') {
            this.sort = { asc : [sort['prop']]};
          } else {
            this.sort = { desc : [sort['prop']]};
          }
        });
      }
    }
    this.fetch();
  }

  onSelect(selected: any): void {
    this.select.emit(selected);
  }

  onActivate(event: any): void {
    if (event.type === 'click') {
      if (this.selectionType === 'checkbox') {
        if (event.cellIndex > 0) {
          this.activate.emit(event.row);
        }
      } else {
        this.activate.emit(event.row);
      }
    }
  }

  setPage(page: Page): void {
    this.pageOffset = page.offset * this.limit;
    this.fetch();
  }

  sanitizedValue(value: any): any {
    return value !== null && value !== undefined ? this.stripHtml(value) : value;
  }

  stripHtml(html: string): string {
    if (!html.replace) {
      return html;
    }
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  onClickButton(event): void {
    this.buttonCell.emit(event);
  }

  private getRequest(): Observable<any[]> {
    const body: any = {
      offset: this.pageOffset,
      limit: this.limit,
      keyword : this._keyword,
      order: this.sort,
    };
    this.loadingIndicator = true;
    return this.http.HTTP_AUTH(this.api, body)
      .pipe(
        map((response: any) => {
          this.count = Number(response.totalRecord);
          this.loadingIndicator = false;
          return (<any[]> response['data']);
        }),
        catchError(() => {
          this.loadingIndicator = false;
          this.count = 0;
          return of([]);
        }));
  }

}
