import { Component, Injector, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ApiBaseResponse, HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, DatatableColumn } from '@dongkap/do-shared';
import { OccupationService } from '../services/occupation.service';

@Component({
  selector: 'do-occupation-list-page',
  styleUrls: ['./occupation-list-page.component.scss'],
  templateUrl: './occupation-list-page.component.html',
})
export class OccupationListPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public apiPathDelete: HttpBaseModel;
  public columns: DatatableColumn[] = [
    { name: 'Code', prop: 'code', width: 225, frozenLeft: true },
    { name: 'Name', prop: 'name', width: 225, frozenLeft: true },
    { name: 'Created', prop: 'createdBy' },
    { name: 'Created Date', prop: 'createdDate' },
    { name: 'Modified', prop: 'modifiedBy' },
    { name: 'Modified Date', prop: 'modifiedDate' },
  ];
  public reload: boolean = false;
  public expanded: boolean = false;
  private occupationCodes: any[];

  constructor(
    public injector: Injector,
    private router: Router,
    private occupationService: OccupationService,
    private dialogService: NbDialogService) {
    super(injector, {
      code: [],
      name: [],
    });
    this.apiPath = this.api['security']['datatable-occupation'];
    this.apiPathDelete = this.api['security']['delete-occupation'];
    this.sort = {
      asc: ['code']
    };
    this.filters = [
      { controlName: 'code', type: 'input' },
      { controlName: 'name', type: 'input' }];
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.occupationService.setOccupation(null);
    this.router.navigate(['/app/mgmt/occupation', 'add']);
  }

  onViewDetail(data): void {
    this.occupationService.setOccupation(data);
    this.router.navigate(['/app/mgmt/occupation', 'edit']);
  }

  onDeleteDialog(data, dialog: TemplateRef<any>): void {
    this.reload = false;
    this.occupationCodes = [];
    data.forEach(value => {
      this.occupationCodes.push(value.code);
    });
    this.dialogService.open(
      dialog,
      { context: 'alert.delete' });
  }

  onDelete(ref: NbDialogRef<any>): void {
    this.disabled = true;
    this.http.HTTP_AUTH(this.apiPathDelete, this.occupationCodes)
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
    this.router.navigate(['/app/mgmt/occupation']);
  }

}
