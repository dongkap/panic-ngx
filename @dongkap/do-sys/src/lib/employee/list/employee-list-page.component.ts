import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, DatatableColumn } from '@dongkap/do-shared';
import { SelectionType } from '@swimlane/ngx-datatable';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'do-employee-list-page',
  styleUrls: ['./employee-list-page.component.scss'],
  templateUrl: './employee-list-page.component.html',
})
export class EmployeeListPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public columns: DatatableColumn[] = [
    { name: 'NIK', prop: 'idEmployee', width: 50, frozenLeft: true, sortable: true },
    { name: 'Name', prop: 'user.fullname', width: 155, frozenLeft: true, sortable: true },
    { name: 'Occupation', prop: 'occupationName', width: 155, frozenLeft: true },
    { name: 'Phone Number', prop: 'phoneNumber' },
    { name: 'Email', prop: 'user.email'},
    { name: 'Address', prop: 'address' },
  ];
  public reload: boolean = false;
  public expanded: boolean = false;
  public selectionType: SelectionType = SelectionType.single;

  constructor(
    public injector: Injector,
    private router: Router,
    private employeeService: EmployeeService) {
    super(injector, {
      idEmployee: [],
      fullname: [],
      occupationName: [],
    });
    this.apiPath = this.api['security']['datatable-employee'];
    this.sort = {
      asc: ['user.fullname']
    };
    this.sortsDefault = [
      { prop: 'user.fullname', dir: 'asc' }
    ];
    this.filters = [
      { controlName: 'idEmployee', type: 'input' },
      { controlName: 'fullname', type: 'input' },
      { controlName: 'occupationName', type: 'input' }];
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.employeeService.setEmployeeHeader(null);
    this.router.navigate(['/app/mgmt/employee', 'add']);
  }

  onViewDetail(data): void {
    this.employeeService.setEmployeeHeader(data);
    this.router.navigate(['/app/mgmt/employee', 'edit']);
  }

  onReset(): void {
    this.router.navigate(['/app/mgmt/employee']);
  }

}
