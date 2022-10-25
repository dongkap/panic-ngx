import { Component, Injector, OnDestroy, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ApiBaseResponse, HttpBaseModel, ResponseCode } from '@dongkap/do-core';
import { BaseFormComponent, DatatableColumn, Keyword, Sort } from '@dongkap/do-shared';
import { EmployeeProfileEducationFormalPromptComponent } from './prompt-formal/profile-education-formal-prompt.component';
import { EmployeeProfileEducationNonFormalPromptComponent } from './prompt-nonformal/profile-education-nonformal-prompt.component';

@Component({
  selector: 'do-employee-profile-education',
  styleUrls: ['./employee-profile-education.component.scss'],
  templateUrl: './employee-profile-education.component.html',
})
export class EmployeeProfileEducationComponent extends BaseFormComponent<any> implements OnInit, OnDestroy {

  public reloadEducation: boolean = false;
  public reloadTraining: boolean = false;
  public apiPathEducation: HttpBaseModel;
  public apiPathTraining: HttpBaseModel;
  public apiPathDeleteEducation: HttpBaseModel;
  public apiPathDeleteTraining: HttpBaseModel;
  public columnsEducation: DatatableColumn[] = [
    { name: 'Level', prop: 'educationalLevel', frozenLeft: true },
    { name: 'School', prop: 'schoolName', frozenLeft: true },
    { name: 'Year', prop: 'startYear', frozenLeft: true },
  ];
  public columnsTraining: DatatableColumn[] = [
    { name: 'Training Name', prop: 'name', frozenLeft: true },
    { name: 'Start Date', prop: 'startDate', frozenLeft: true },
    { name: 'End Date', prop: 'endDate', frozenLeft: true },
  ];
  public sortEducation: Sort;
  public sortTraining: Sort;
  public educationIds: any[] = [];
  public trainingIds: any[] = [];
  public keyword: Keyword;
  private loadingSubject$: Subject<boolean> = new Subject<boolean>();

  constructor(
    injector: Injector,
    private dialogService: NbDialogService) {
      super(injector);
      this.apiPathEducation = this.api['profile']['get-profile-education-employee'];
      this.apiPathTraining = this.api['profile']['get-profile-training-employee'];
      this.apiPathDeleteEducation = this.api['profile']['delete-profile-employee-education'];
      this.apiPathDeleteTraining = this.api['profile']['delete-profile-employee-training'];
      this.sortEducation = {
        desc: ['startYear']
      };
      this.sortTraining = {
        desc: ['startDate']
      };
  }

  ngOnInit(): void {
  }

  loadDataMenu(): Observable<any> {
    this.reloadEducation = true;
    this.reloadTraining = true;
    return this.loadingSubject$.asObservable();
  }

  ngOnDestroy(): void {}

  onAddEducation(): void {
    this.reloadEducation = false;
    this.dialogService.open(EmployeeProfileEducationFormalPromptComponent)
      .onClose.subscribe((data: any) => {
        if (data) {
          (super.onSubmit(data, 'profile', 'post-profile-employee-education')  as Observable<ApiBaseResponse>)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
              if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
                this.reloadEducation = true;
              }
            });
        }
      });
  }

  onAddTraining(): void {
    this.reloadTraining = false;
    this.dialogService.open(EmployeeProfileEducationNonFormalPromptComponent)
      .onClose.subscribe((data: any) => {
        if (data) {
          (super.onSubmit(data, 'profile', 'post-profile-employee-training')  as Observable<ApiBaseResponse>)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
              if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
                this.reloadTraining = true;
              }
            });
        }
      });
  }

  onEditEducation(data): void {
    this.reloadEducation = false;
    this.dialogService.open(EmployeeProfileEducationFormalPromptComponent, {
        context: {
          education: data,
        },
      })
      .onClose.subscribe((result: any) => {
        if (result) {
          (super.onSubmit(result, 'profile', 'post-profile-employee-education')  as Observable<ApiBaseResponse>)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
              if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
                this.reloadEducation = true;
              }
            });
        }
      });
  }

  onEditTraining(data): void {
    this.reloadTraining = false;
    this.dialogService.open(EmployeeProfileEducationNonFormalPromptComponent, {
        context: {
          training: data,
        },
      })
      .onClose.subscribe((result: any) => {
        if (result) {
          (super.onSubmit(result, 'profile', 'post-profile-employee-training')  as Observable<ApiBaseResponse>)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
              if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
                this.reloadTraining = true;
              }
            });
        }
      });
  }

  onDeleteEducationDialog(data, dialog: TemplateRef<any>): void {
    this.reloadEducation = false;
    this.educationIds = [];
    data.forEach(value => {
      this.educationIds.push(value.id);
    });
    this.dialogService.open(
      dialog,
      { context: 'alert.delete' });
  }

  onDeleteTrainingDialog(data, dialog: TemplateRef<any>): void {
    this.reloadTraining = false;
    this.trainingIds = [];
    data.forEach(value => {
      this.trainingIds.push(value.id);
    });
    this.dialogService.open(
      dialog,
      { context: 'alert.delete' });
  }

  onDeleteEducation(ref: NbDialogRef<any>): void {
    this.disabled = true;
    this.http.HTTP_AUTH(this.apiPathDeleteEducation, this.educationIds)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (success: ApiBaseResponse) => {
          this.disabled = false;
          ref.close();
          this.reloadEducation = true;
          this.toastr.showI18n(success.respStatusMessage[success.respStatusCode], true);
        },
        (error: ApiBaseResponse) => {
          this.disabled = false;
          this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
        },
    );
  }

  onDeleteTraining(ref: NbDialogRef<any>): void {
    this.disabled = true;
    this.http.HTTP_AUTH(this.apiPathDeleteTraining, this.trainingIds)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (success: ApiBaseResponse) => {
          ref.close();
          this.reloadTraining = true;
          this.disabled = false;
          this.toastr.showI18n(success.respStatusMessage[success.respStatusCode], true);
        },
        (error: ApiBaseResponse) => {
          this.disabled = false;
          this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
        },
    );
  }

  onLoadEducation(): void {
    this.loadingSubject$.next(true);
  }

  onLoadTraining(): void {
    this.loadingSubject$.next(true);
  }

}
