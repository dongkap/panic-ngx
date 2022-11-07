import { ChangeDetectionStrategy, Component, Injector, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, DatatableColumn } from '@dongkap/do-shared';
import { ClientDetailsService } from '../services/client-details.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'do-client-details-list',
  templateUrl: 'client-details-list.component.html',
  styleUrls: ['client-details-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailsListComponent extends BaseFilterComponent<any> implements OnInit{

  public columns: DatatableColumn[] = [
    { name: 'Client ID', prop: 'clientId', width: 125, frozenLeft: true },
    { name: 'Access Token Validity', prop: 'accessTokenValidity', width: 100, frozenLeft: true },
    { name: 'Refresh Token Validity', prop: 'refreshTokenValidity', width: 100, frozenLeft: true },
    { name: 'Resource Ids', prop: 'resourceIds', width: 225 },
  ];
  public reload: boolean = false;
  private clientIds: any[];
  public apiPath: HttpBaseModel;
  public apiPathDelete: HttpBaseModel;

  constructor(
    public injector: Injector,
    private router: Router,
    private dialogService: NbDialogService,
    private clientDetailsService: ClientDetailsService) {
      super(injector);
      this.apiPath = this.api['security']['datatable-client-details'];
      this.apiPathDelete = this.api['security']['delete-client-details'];
  }

  ngOnInit(): void {
  }

  onAddClientDetails(): void {
    this.router.navigate(['/app/mgmt/client-ids/add']);
  }

  onViewClientDetails(data: any) {
      this.clientDetailsService.setClientDetails(data);
      this.router.navigate(['/app/mgmt/client-ids/edit', data['clientId']]);
  }

  onDeleteClientDetails(data, dialog: TemplateRef<any>): void {
    this.reload = false;
    this.clientIds = [];
    data.forEach(value => {
      this.clientIds.push(value.parameterGroupCode);
    });
    this.dialogService.open(
      dialog,
      { context: 'alert.delete' });
  }

  onDelete(ref: NbDialogRef<any>): void {
    this.disabled = true;
    this.http.HTTP_AUTH(this.apiPathDelete, this.clientIds)
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

}
