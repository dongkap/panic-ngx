import {
  Component,
  Input,
  ViewEncapsulation,
  Inject,
  LOCALE_ID,
  Injector,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ColumnMode, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { HTTP_SERVICE, HttpFactoryService, HttpBaseModel } from '@dongkap/do-core';
import { Page, Sort, Keyword, DatatableFilter, DatatableColumn } from './models/datatable.model';

@Component({
  selector: 'do-datatable',
  styleUrls: ['./do-datatable.component.scss'],
  templateUrl: './do-datatable.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoDatatableComponent implements OnInit, OnDestroy {
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
  @Input() selectionType: SelectionType = SelectionType.checkbox;
  @Input() columnMode: ColumnMode = ColumnMode.force;
  @Input() headerHeight: any = 40;
  @Input() footerHeight: any = 'auto';
  @Input() rowHeight: number | 'auto' | ((row?: any) => number) = 'auto';
  @Input() header: boolean = true;
  @Input() column: boolean = true;
  @Input() footer: boolean = true;
  @Input() add: boolean = true;
  @Input() edit: boolean = true;
  @Input() delete: boolean = true;
  @Input() filter: boolean = true;
  @Input() api: HttpBaseModel;
  @Input() startWithOpenData: boolean = true;
  @Input() filterEvent: boolean = false;
  @Input() formGroupFilter: FormGroup;
  @Input() sort: Sort;
  @Input() sortsDefault: any[];
  @Input() autoLoad: boolean = true;
  @Output() onAdd: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() onButtonCell: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();
//  @ViewChild('datatable', {static: false}) datatable: DatatableComponent;
  @Input() set filterFn(keyword: Keyword) {
    this.keywordParam = keyword;
    this._keyword = keyword;
    this.count = 0;
    this.offset = 0;
  }
  @Input() set filterDoFetchFn(keyword: Keyword) {
    if (keyword) {
      this.keywordParam = keyword;
      this._keyword = keyword;
    }
    this.count = 0;
    this.offset = 0;
    this.fetch();
  }
  @Input() set reloadFn(reload: boolean) {
    if (reload && !this.loadingIndicator) {
      this.selected = [];
      this.count = 0;
      this.offset = 0;
      this.fetch();
    }
  }
  public keywordParam: Keyword;
  public _keyword: Keyword;
  public isDelete: boolean = false;
  protected http: HttpFactoryService;
  private destroy$: Subject<any> = new Subject<any>();
  private cdref: ChangeDetectorRef;
  private pageOffset: number = 0;

  protected _search: string;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    public injector: Injector) {
    this.http = injector.get(HTTP_SERVICE);
    this.cdref = injector.get(ChangeDetectorRef);
  }

  ngOnInit(): void {
    if (this.startWithOpenData) {
      this.fetch();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  doSearch(search: string): void {
    this.isDelete = false;
    this.onSearch.emit(search);
    if (this.keywordParam) {
      this._keyword = this.keywordParam;
      this._keyword['_all'] = search;
    } else {
      this._keyword = {
        _all: search,
      };
    }
    this.count = 0;
    this.offset = 0;
    this.fetch();
  }

  doFilter(search: any): void {
    this.isDelete = false;
    if (this.filterEvent) {
      this.onFilter.emit(search);
    } else {
      if (this.keywordParam) {
        this._keyword = this.keywordParam;
      } else {
        this._keyword = {};
      }
      this.filters.forEach(filter => {
        switch (filter.type) {
          case 'input':
          case 'datepicker':
          case 'radio':
            this._keyword[filter.controlName] = search[filter.controlName] ? search[filter.controlName] : null;
            break;
          case 'select':
            this._keyword[filter.controlName] = search[filter.controlName].label ? search[filter.controlName] : null;
            break;
          case 'checkbox':
            this._keyword[filter.controlName] = search[filter.controlName].name ? search[filter.controlName].name : null;
            break;
          default:
            break;
        }
      });
      this.count = 0;
      this.offset = 0;
      this.fetch();
    }
  }

  doAdd(add: boolean): void {
    this.onAdd.emit(add);
  }

  doEdit(row: any): void {
    this.onEdit.emit(row);
  }

  doDelete(): void {
    this.onDelete.emit(this.selected);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key.toUpperCase() === 'ENTER') {
      this.doSearch(this._search);
    }
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

  setPage(page: Page): void {
    this.pageOffset = page.offset * this.limit;
    this.fetch();
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

  onSelect({ selected }): void {
    if (Array.isArray(selected)) {
      if (selected.length > 0) {
        if (this.delete) { this.isDelete = true; }
      } else {
        this.isDelete = false;
      }
      this.selected = selected;
      this.onSelected.emit(this.selected);
    } else {
      this.isDelete = false;
    }
  }

  onClickButton(event): void {
    this.onButtonCell.emit(event);
  }

  private getRequest(): Observable<any[]> {
    const body: any = {
      offset: this.pageOffset,
      limit: this.limit,
      keyword : this._keyword,
      order: this.sort,
    };
    this.loadingIndicator = true;
    this.onLoading.emit(this.loadingIndicator);
    return this.http.HTTP_AUTH(this.api, body)
      .pipe(
        map((response: any) => {
          this.count = Number(response.totalRecord);
          this.loadingIndicator = false;
          this.onLoading.emit(this.loadingIndicator);
          return (response['data'] as any[]);
        }),
        catchError(() => {
          this.loadingIndicator = false;
          this.count = 0;
          this.onLoading.emit(this.loadingIndicator);
          return of([]);
        }));
  }

}
