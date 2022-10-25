import {
  Component,
  Input,
  ViewEncapsulation,
  Inject,
  LOCALE_ID,
  Injector,
  Output,
  EventEmitter,
} from '@angular/core';
import { ColumnMode, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { Page, DatatableColumn } from '../models/datatable.model';

@Component({
  selector: 'do-datatable-base',
  styleUrls: ['./do-datatable-base.component.scss'],
  templateUrl: './do-datatable-base.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoDatatableBaseComponent {
  @Input() rows: any[] = [];
  @Input() selected: any[] = [];
  @Input() limit: number | undefined = 10;
  @Input() count: number = 0;
  @Input() offset: number = 0;
  @Input() externalPaging: boolean = false;
  @Input() externalSorting: boolean = false;
  @Input() loadingIndicator: boolean = false;
  @Input() scrollbarH: boolean = false;
  @Input() scrollbarV: boolean = false;
  @Input() reorderable: boolean = true;
  @Input() sortType: SortType = SortType.single;
  @Input() sortsDefault: any[];
  @Input() messages: any;
  @Input() selectionType: SelectionType = SelectionType.checkbox;
  @Input() columnMode: ColumnMode = ColumnMode.force;
  @Input() headerHeight: any = 40;
  @Input() footerHeight: any = 'auto';
  @Input() rowHeight: number | 'auto' | ((row?: any) => number) = 'auto';
  @Input() header: boolean = false;
  @Input() column: boolean = false;
  @Input() footer: boolean = false;
  @Input() add: boolean = true;
  @Input() edit: boolean = true;
  @Input() delete: boolean = false;
  @Input() filter: boolean = true;
  @Input() startWithOpenData: boolean = true;
  @Output() page: EventEmitter<Page> = new EventEmitter<Page>();
  @Output() sort: EventEmitter<any> = new EventEmitter<any>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() activate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onButtonCell: EventEmitter<any> = new EventEmitter<any>();

  private cols: DatatableColumn[] = [];
  @Input() set columns(val: DatatableColumn[]){
    val.forEach(function(part, index) {
      if (!this[index]?.sortable) {
        this[index].sortable = false;
      }
    }, val);
    this.cols = val;
  }

  get columns(): DatatableColumn[] {
    return this.cols;
  }

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    public injector: Injector) {
  }

  setPage(page: Page): void {
    this.page.emit(page);
  }

  onSort(order: any): void {
    this.sort.emit(order);
  }

  onSelect(selected: any): void {
    this.select.emit(selected);
  }

  onActivate(event: any): void {
    if (event.type === 'click') {
      event.cellElement.blur();
      if (this.selectionType === 'checkbox') {
        if (event.cellIndex > 0) {
          this.activate.emit(event.row);
        }
      } else {
        this.activate.emit(event.row);
      }
    }
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
    this.onButtonCell.emit(event);
  }

}
