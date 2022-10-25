import { Component, Injector, OnDestroy, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse } from '@dongkap/do-core';
import { BaseComponent, DoToastrService } from '@dongkap/do-shared';
import { EmployeeProfilePersonalInformationComponent } from './personal-information/employee-profile-personal-information.component';
import { EmployeeProfileEducationComponent } from './education/employee-profile-education.component';
import { EmployeeProfileEmployeeStatusComponent } from './employee-status/employee-profile-employee-status.component';

@Component({
  selector: 'do-employee-profile-page',
  styleUrls: ['./employee-profile-page.component.scss'],
  templateUrl: './employee-profile-page.component.html',
})
export class EmployeeProfilePageComponent extends BaseComponent<any> implements OnInit, OnDestroy {

  public loading: boolean = false;
  public tab: string = 'personalInfo';
  protected destroy$: Subject<any> = new Subject<any>();

  @ViewChild('personalInfo', { static: true }) personalInfo: EmployeeProfilePersonalInformationComponent;
  @ViewChild('education', { static: true }) education: EmployeeProfileEducationComponent;
  @ViewChild('employeeStatus', { static: true }) employeeStatus: EmployeeProfileEmployeeStatusComponent;

  constructor(public injector: Injector, private toastr: DoToastrService) {
    super(injector);
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
