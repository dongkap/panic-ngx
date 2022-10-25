import { Component, Injector, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiBaseResponse } from '@dongkap/do-core';
import { BaseFormComponent } from '@dongkap/do-shared';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'do-employee-profile-employee-status',
  styleUrls: ['./employee-profile-employee-status.component.scss'],
  templateUrl: './employee-profile-employee-status.component.html',
})
export class EmployeeProfileEmployeeStatusComponent extends BaseFormComponent<any> implements OnInit, OnDestroy {

  public loadingForm: boolean = false;
  public dataEmployeeStatus: any;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  loadDataMenu(): Observable<any> {
    this.loadingForm = true;
    return this.exec('profile', 'get-profile-employee-status').pipe(map(
      (success: any) => {
        this.loadingForm = false;
        this.dataEmployeeStatus = success;
      }));
  }

}
