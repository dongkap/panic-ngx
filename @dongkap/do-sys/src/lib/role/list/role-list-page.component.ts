import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionType } from '@swimlane/ngx-datatable';
import { HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, DatatableColumn } from '@dongkap/do-shared';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'do-role-list-page',
  styleUrls: ['./role-list-page.component.scss'],
  templateUrl: './role-list-page.component.html',
})
export class RoleListPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public selectionType: SelectionType = SelectionType.single;
  public columns: DatatableColumn[] = [
    { name: 'Authority', prop: 'authority', width: 150, frozenLeft: true },
    { name: 'Description', prop: 'description', width: 275, frozenLeft: true },
    { name: 'Created', prop: 'createdBy' },
    { name: 'Created Date', prop: 'createdDate' },
    { name: 'Modified', prop: 'modifiedBy' },
    { name: 'Modified Date', prop: 'modifiedDate' },
  ];
  public expanded: boolean = false;

  constructor(public injector: Injector, private router: Router, private roleService: RoleService) {
    super(injector, {
      authority: [],
      description: [],
    });
    this.apiPath = this.api['security']['datatable-role'];
    this.sort = {
      asc: ['level']
    };
    this.filters = [
      { controlName: 'authority', type: 'input' },
      { controlName: 'description', type: 'input' }];
  }

  ngOnInit(): void {
  }

  onAddGroup(): void {
    this.router.navigate(['/app/mgmt/role', 'add']);
  }

  onViewDetail(data): void {
    this.roleService.setRole(data);
    this.router.navigate(['/app/mgmt/role', 'edit']);
  }

  onReset(): void {
    this.router.navigate(['/app/mgmt/role']);
  }

  back(): boolean {
    this.router.navigate(['/app/mgmt/role']);
    return false;
  }

}
