import { Component, Injector, OnDestroy, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ApiBaseResponse, HttpBaseModel } from '@dongkap/do-core';
import { BaseComponent, DatatableColumn, DoToastrService, Keyword, Sort, SortProperties } from '@dongkap/do-shared';
import { JobPlacementService } from '../services/job-placement.service';
import { AssignmentGroupModel } from '../models/job-placement.model';
import { EmployeePromptComponent } from './prompt-employee/employee-prompt.component';

@Component({
  selector: 'do-job-placement-edit-page',
  styleUrls: ['./job-placement-edit-page.component.scss'],
  templateUrl: './job-placement-edit-page.component.html',
})
export class JobPlacementEditPageComponent extends BaseComponent<any> implements OnInit, OnDestroy {

  public loading: boolean = false;
  public disabled: boolean = false;
  protected destroy$: Subject<any> = new Subject<any>();
  public assignmentGroup: AssignmentGroupModel;
  public businessPartner: any;
  public reload: boolean = false;
  public apiPath: HttpBaseModel;
  public apiPathAdd: HttpBaseModel;
  public apiPathDelete: HttpBaseModel;
  public columns: DatatableColumn[] = [
    { name: 'Employee Name', prop: 'employee.fullname', frozenLeft: true, sortable: true },
    { name: 'NIK', prop: 'employee.idEmployee', frozenLeft: true },
    { name: 'Occupation', prop: 'employee.occupation.name', frozenLeft: true },
  ];
  public sort: Sort;
  public sortsDefault: SortProperties[];
  public keyword: Keyword;
  public assignmentIds: any[] = [];

  constructor(
    public injector: Injector,
    private router: Router,
    private toastr: DoToastrService,
    private dialogService: NbDialogService,
    private jobPlacementService: JobPlacementService) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.jobPlacementService.getAssignmentGroup()) {
      this.apiPath = this.api['activity']['datatable-assignment'];
      this.apiPathAdd = this.api['activity']['post-assignment'];
      this.apiPathDelete = this.api['activity']['delete-assignment'];
      this.sort = {
        asc: ['employee.fullname']
      };
      this.sortsDefault = [
        { prop: 'employee.fullname', dir: 'asc' }
      ];
      this.assignmentGroup = this.jobPlacementService.getAssignmentGroup();
      this.loading = true;
      this.keyword = {
        assignmentGroupId: this.assignmentGroup.id,
      };
      this.exec('master', 'get-business-partner', {
        id: this.jobPlacementService.getAssignmentGroup()?.bpId
      }).
      pipe(takeUntil(this.destroy$)).subscribe(
        (success: any) => {
          this.loading = false;
          this.businessPartner = success;
        },
        (error: any | ApiBaseResponse) => {
          this.loading = true;
          if (error instanceof HttpErrorResponse) {
              error = error['error'] as ApiBaseResponse;
          }
          this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
        },
      );
    } else {
      this.router.navigate(['/app/mgmt/job-placement']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAddAssignment(): void {
    this.dialogService.open(EmployeePromptComponent)
      .onClose.subscribe((data: any[]) => {
        if (data) {
          if (data.length) {
            const employeeIds: any[] = [];
            data.forEach(employee => {
              employeeIds.push(employee.id);
            });
            const dataRequest: any = {
              id: this.assignmentGroup.id,
              bpId: this.assignmentGroup.bpId,
              employeeIds,
            };
            this.disabled = true;
            this.http.HTTP_AUTH(this.apiPathAdd, dataRequest)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                (success: ApiBaseResponse) => {
                  this.disabled = false;
                  this.reload = true;
                  if (this.assignmentGroup) {
                    this.assignmentGroup['id'] = success.respStatusMessage['assignmentGroupId'];
                  }
                  this.keyword = {
                    assignmentGroupId: success.respStatusMessage['assignmentGroupId'],
                  };
                  this.toastr.showI18n(success.respStatusMessage[success.respStatusCode], true);
                },
                (error: ApiBaseResponse) => {
                  this.disabled = false;
                  this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
                },
            );
          }
        }
      });
  }

  onDeleteAssignmentDialog(data, dialog: TemplateRef<any>): void {
    this.reload = false;
    this.assignmentIds = [];
    data.forEach(value => {
      this.assignmentIds.push(value.id);
    });
    this.dialogService.open(
      dialog,
      { context: 'alert.delete' });
  }

  onDeleteAssignment(ref: NbDialogRef<any>): void {
    this.disabled = true;
    const data: any = {
      id: this.assignmentGroup.id,
      assignmentIds: this.assignmentIds,
    };
    this.http.HTTP_AUTH(this.apiPathDelete, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (success: ApiBaseResponse) => {
          this.disabled = false;
          ref.close();
          this.reload = true;
          this.toastr.showI18n(success.respStatusMessage[success.respStatusCode], true);
        },
        (error: ApiBaseResponse) => {
          this.disabled = false;
          this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
        },
    );
  }

}
