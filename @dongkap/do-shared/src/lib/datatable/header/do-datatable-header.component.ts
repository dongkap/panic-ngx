import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { OnDestroy } from '@angular/core';
import { DoDatatableCollapseComponent } from './collapse/do-datatable-collapse.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'do-datatable-header',
  styleUrls: ['./do-datatable-header.component.scss'],
  templateUrl: './do-datatable-header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoDatatableHeaderComponent implements OnDestroy {
  @Input() header: boolean = true;
  @Input() footer: boolean = true;
  @Input() add: boolean = true;
  @Input() edit: boolean = true;
  @Input() delete: boolean = false;
  @Input() filter: boolean = true;
  @Input() formGroupFilter: FormGroup;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAdd: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onDelete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('collapse', {static: false}) collapse: DoDatatableCollapseComponent;

  public _search: string;
  public showFilter: boolean = false;
  public disabledButtonFilter: boolean = true;

  ngOnDestroy(): void {}

  doSearch(search: string): void {
    if (this.showFilter) { this.doFilterFunnel(); }
    this.onSearch.emit(search);
  }

  doFilterFunnel(): void {
    this._search = undefined;
    this.collapse.toggle();
    this.showFilter = !this.showFilter;
    if (!this.showFilter) {
      this.formGroupFilter.reset();
    } else {
      this.formGroupFilter.valueChanges.subscribe(val => {
        this.disabledButtonFilter = false;
      });
    }
  }

  doFilter(): void {
    this.onFilter.emit(this.formGroupFilter.value);
  }

  doAdd(): void {
    this.onAdd.emit(true);
  }

  doDelete(): void {
    this.onDelete.emit(true);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key.toUpperCase() === 'ENTER') {
      this.doSearch(this._search);
    }
  }

  onFocusSearch(): void {
    if (this.showFilter) { this.doFilterFunnel(); }
  }

}
