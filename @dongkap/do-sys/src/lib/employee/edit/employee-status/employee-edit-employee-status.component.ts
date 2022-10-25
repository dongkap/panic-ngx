import { Component, Injector, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, ResponseCode, HttpBaseModel, RoleModel } from '@dongkap/do-core';
import { BaseFormComponent, CheckboxModel, SelectResponseModel } from '@dongkap/do-shared';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'do-employee-edit-employee-status',
  styleUrls: ['./employee-edit-employee-status.component.scss'],
  templateUrl: './employee-edit-employee-status.component.html',
})
export class EmployeeEditEmployeeStatusComponent extends BaseFormComponent<any> implements OnInit, OnDestroy {

  public apiSelectOccupation: HttpBaseModel;
  public apiSelectRole: HttpBaseModel;
  public apiSelectEmployeeParent: HttpBaseModel;
  public username: string;
  public permissionsData: CheckboxModel[] = [];

  constructor(
    public injector: Injector,
    private router: Router,
    private employeeService: EmployeeService) {
    super(injector, {
      occupation: [],
      role: [],
      employeeParent: [],
      permissions: [],
    });
    this.apiSelectOccupation = this.api['security']['select-occupation'];
    this.apiSelectRole = this.api['security']['select-role'];
    this.apiSelectEmployeeParent = this.api['security']['select-employee'];
  }

  ngOnInit(): void {
    if (!this.employeeService.getEmployeeHeader()) {
      this.router.navigate(['/app/mgmt/employee']);
      return;
    }
    this.http.HTTP_AUTH(this.api['master']['checkbox-parameter'], {
      keyword : {
        parameterGroupCode: 'PERMISSION',
      },
    }).pipe(takeUntil(this.destroy$), map((response: any) => {
        this.permissionsData = response;
      }), catchError(() => of([]))).subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  loadDataMenu(): Observable<any> {
    this.loadingForm = true;
    return this.exec('security', 'get-employee-status', {
      employeeId: this.employeeService.getEmployeeHeader()?.id
    }).pipe(map(
      (success: any) => {
        this.loadingForm = false;
        this.username = success.username;
        const roles: any[] = success.roles;
        const selectRoles: SelectResponseModel[] = [];
        roles.forEach(role => {
          selectRoles.push({
            label: role.description,
            value: role.authority,
            disabled: false,
          });
        });
        this.formGroup.controls['role'].setValue(selectRoles);
        this.formGroup.controls['occupation'].setValue({
          label: success.occupation?.name,
          value: success.occupation?.code
        });
        this.formGroup.controls['employeeParent'].setValue({
          label: success.parentLabel,
          value: success.parentValue
        });
        const permissions: any[] = this.permissionsData;
        permissions.forEach((permission) => {
          if (permission.id === 'PERMISSION.DISABLED') {
            permission['selected'] = success.disabled;
          }
          if (permission.id === 'PERMISSION.LOCKED') {
            permission['selected'] = success.locked;
          }
          if (permission.id === 'PERMISSION.ACCOUNT_EXPIRED') {
            permission['selected'] = success.accountExpired;
          }
        });
        this.formGroup.controls['permissions'].setValue(permissions);
        this.formGroup.markAsPristine();
      }));
  }

  onReset(): void {
    this.router.navigate(['/app/mgmt/employee']);
  }

  onSubmit(): void {
    const roles: RoleModel[] = [];
    const tmpRoles: SelectResponseModel[] = (this.formGroup.get('role').value as SelectResponseModel[]);
    tmpRoles.forEach(role => {
      roles.push({
        authority: role.value
      });
    });
    let disabled: boolean = false;
    let locked: boolean = false;
    let accountExpired: boolean = false;
    const permissions: CheckboxModel[] =
      this.formGroup.get('permissions').value ? this.formGroup.get('permissions').value : this.permissionsData;
    permissions.forEach((permission) => {
      if (permission.id === 'PERMISSION.DISABLED') {
        disabled = permission['selected'];
      }
      if (permission.id === 'PERMISSION.LOCKED') {
        locked = permission['selected'];
      }
      if (permission.id === 'PERMISSION.ACCOUNT_EXPIRED') {
        accountExpired = permission['selected'];
      }
    });
    const data: any = {
      id: this.employeeService.getEmployeeHeader().id,
      disabled,
      locked,
      accountExpired,
      parentId: this.formGroup.get('employeeParent').value?.value,
      roles,
      occupation: {
        code: this.formGroup.get('occupation').value?.value
      },
    };
    (super.onSubmit(data, 'security', 'put-employee-status')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.router.navigate(['/app/mgmt/employee']);
        }
      });
  }

}
