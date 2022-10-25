import { Component, Injector, OnDestroy, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse } from '@dongkap/do-core';
import { BaseComponent, DoToastrService } from '@dongkap/do-shared';
import { EmployeeService } from '../services/employee.service';
import { EmployeeEditPersonalInformationComponent } from './personal-information/employee-edit-personal-information.component';
import { EmployeeEditEducationComponent } from './education/employee-edit-education.component';
import { EmployeeEditEmployeeStatusComponent } from './employee-status/employee-edit-employee-status.component';

@Component({
  selector: 'do-employee-edit-page',
  styleUrls: ['./employee-edit-page.component.scss'],
  templateUrl: './employee-edit-page.component.html',
})
export class EmployeeEditPageComponent extends BaseComponent<any> implements OnInit, OnDestroy {

  public loading: boolean = false;
  public tab: string = 'personalInfo';
  protected destroy$: Subject<any> = new Subject<any>();

  @ViewChild('personalInfo', { static: true }) personalInfo: EmployeeEditPersonalInformationComponent;
  @ViewChild('education', { static: true }) education: EmployeeEditEducationComponent;
  @ViewChild('employeeStatus', { static: true }) employeeStatus: EmployeeEditEmployeeStatusComponent;

  constructor(
    public injector: Injector,
    private router: Router,
    private employeeService: EmployeeService,
    private toastr: DoToastrService) {
    super(injector);
    if (this.employeeService.getEmployeeHeader()) {
    } else {
      this.router.navigate(['/app/mgmt/employee']);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleLoadingAnimation(event: any) {
    this.tab = event.tabId;
    this.loading = true;
    if (this.tab === 'personalInfo') {
      this.personalInfo.loadDataMenu()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.loading = false;
      }, (error: any | ApiBaseResponse) => {
        if (error instanceof HttpErrorResponse) {
            error = error['error'] as ApiBaseResponse;
        }
        this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
      });
    } else if (this.tab === 'education') {
      this.education.loadDataMenu()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.loading = false;
      }, (error: any | ApiBaseResponse) => {
        if (error instanceof HttpErrorResponse) {
            error = error['error'] as ApiBaseResponse;
        }
        this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
      });
    } else {
      this.employeeStatus.loadDataMenu()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.loading = false;
      }, (error: any | ApiBaseResponse) => {
        if (error instanceof HttpErrorResponse) {
            error = error['error'] as ApiBaseResponse;
        }
        this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
      });
    }
  }

}
