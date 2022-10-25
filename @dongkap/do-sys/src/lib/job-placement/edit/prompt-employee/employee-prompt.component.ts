import { Component, Inject, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { API, APIModel, HttpBaseModel } from '@dongkap/do-core';
import { DatatableColumn, Sort, SortProperties } from '@dongkap/do-shared';

@Component({
  selector: 'do-employee-prompt',
  templateUrl: 'employee-prompt.component.html',
  styleUrls: ['employee-prompt.component.scss'],
})
export class EmployeePromptComponent implements OnInit {

  @Input() public education: any;
  public apiPath: HttpBaseModel;
  public columns: DatatableColumn[] = [
    { name: 'Employee Name', prop: 'user.fullname', frozenLeft: true },
    { name: 'NIK', prop: 'idEmployee', width: 50, frozenLeft: true },
    { name: 'Occupation', prop: 'occupationName', frozenLeft: true },
  ];
  public sort: Sort;
  public sortsDefault: SortProperties[];
  public disabled: boolean = true;
  public selected: any[] = [];

  constructor(
    @Inject(API) private api: APIModel,
    protected ref: NbDialogRef<EmployeePromptComponent>) {
      this.apiPath = this.api['security']['datatable-employee'];
      this.sort = {
        asc: ['user.fullname']
      };
      this.sortsDefault = [
        { prop: 'user.fullname', dir: 'asc' }
      ];
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.ref.close(this.selected);
  }

  onReset(): void {
    this.ref.close();
  }

  onSelected(data: any[]) {
    if (data) {
      if (data.length) {
        this.selected = data;
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    } else {
      this.disabled = true;
    }
  }

}
