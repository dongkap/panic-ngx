import { Component, Injector, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ApiBaseResponse, HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, DatatableColumn } from '@dongkap/do-shared';
import { AppsService } from '../services/apps.service';

@Component({
  selector: 'do-apps-list-page',
  styleUrls: ['./apps-list-page.component.scss'],
  templateUrl: './apps-list-page.component.html',
})
export class AppsListPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public apiPathDelete: HttpBaseModel;
  public columns: DatatableColumn[] = [
    { name: 'Code', prop: 'appCode', width: 150, frozenLeft: true },
    { name: 'Name', prop: 'appName', width: 150, frozenLeft: true },
    { name: 'Description', prop: 'description', width: 200, frozenLeft: true },
    { name: 'Created', prop: 'createdBy' },
    { name: 'Created Date', prop: 'createdDate' },
    { name: 'Modified', prop: 'modifiedBy' },
    { name: 'Modified Date', prop: 'modifiedDate' },
    { name: 'Active', prop: 'active' },
  ];
  public reload: boolean = false;
  public expanded: boolean = false;
  private appCodes: any[];

  constructor(
    public injector: Injector,
    private router: Router,
    private appsService: AppsService,
    private dialogService: NbDialogService) {
    super(injector, {
      appCode: [],
      appName: [],
    });
    this.apiPath = this.api['security']['datatable-apps'];
    this.apiPathDelete = this.api['security']['delete-apps'];
    this.sort = {
      asc: ['appCode']
    };
    this.filters = [
      { controlName: 'appCode', type: 'input' },
      { controlName: 'appName', type: 'input' }];
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.appsService.setApps(null);
    this.router.navigate(['/app/mgmt/apps', 'add']);
  }

  onViewDetail(data): void {
    this.appsService.setApps(data);
    this.router.navigate(['/app/mgmt/apps', 'edit']);
  }

  onDeleteDialog(data, dialog: TemplateRef<any>): void {
    this.reload = false;
    this.appCodes = [];
    data.forEach(value => {
      this.appCodes.push(value.appCode);
    });
    this.dialogService.open(
      dialog,
      { context: 'alert.delete' });
  }

  onDelete(ref: NbDialogRef<any>): void {
    this.disabled = true;
    this.http.HTTP_AUTH(this.apiPathDelete, this.appCodes)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (success: ApiBaseResponse) => {
          ref.close();
          this.disabled = false;
          this.reload = true;
          this.toastr.showI18n(success.respStatusMessage[success.respStatusCode], true);
        },
        (error: ApiBaseResponse) => {
          this.disabled = false;
          this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
        },
    );
  }

  onReset(): void {
    this.router.navigate(['/app/mgmt/apps']);
  }

}
