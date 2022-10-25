import { Component, Injector, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ApiBaseResponse, HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, DatatableColumn } from '@dongkap/do-shared';
import { CorporateService } from '../services/corporate.service';

@Component({
  selector: 'do-corporate-list-page',
  styleUrls: ['./corporate-list-page.component.scss'],
  templateUrl: './corporate-list-page.component.html',
})
export class CorporateListPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public apiPathDelete: HttpBaseModel;
  public columns: DatatableColumn[] = [
    { name: 'Code', prop: 'corporateCode', width: 75, frozenLeft: true },
    { name: 'Name', prop: 'corporateName', width: 275, frozenLeft: true },
    { name: 'Telp', prop: 'telpNumber', width: 100, frozenLeft: true },
    { name: 'Fax', prop: 'faxNumber', width: 100, frozenLeft: true },
    { name: 'Email', prop: 'email', width: 175 },
    { name: 'Address', prop: 'address' },
    { name: 'Created', prop: 'createdBy' },
    { name: 'Created Date', prop: 'createdDate' },
    { name: 'Modified', prop: 'modifiedBy' },
    { name: 'Modified Date', prop: 'modifiedDate' },
  ];
  public reload: boolean = false;
  public expanded: boolean = false;
  private corporateCodes: any[];

  constructor(
    public injector: Injector,
    private router: Router,
    private corporateService: CorporateService,
    private dialogService: NbDialogService) {
    super(injector, {
      corporateCode: [],
      corporateName: [],
    });
    this.apiPath = this.api['security']['datatable-corporate'];
    this.apiPathDelete = this.api['security']['delete-corporate'];
    this.sort = {
      asc: ['corporateCode']
    };
    this.filters = [
      { controlName: 'corporateCode', type: 'input' },
      { controlName: 'corporateName', type: 'input' }];
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.corporateService.setCorporate(null);
    this.router.navigate(['/app/mgmt/corporate', 'add']);
  }

  onViewDetail(data): void {
    this.corporateService.setCorporate(data);
    this.router.navigate(['/app/mgmt/corporate', 'edit']);
  }

  onDeleteDialog(data, dialog: TemplateRef<any>): void {
    this.reload = false;
    this.corporateCodes = [];
    data.forEach(value => {
      this.corporateCodes.push(value.corporateCode);
    });
    this.dialogService.open(
      dialog,
      { context: 'alert.delete' });
  }

  onDelete(ref: NbDialogRef<any>): void {
    this.disabled = true;
    this.http.HTTP_AUTH(this.apiPathDelete, this.corporateCodes)
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
    this.router.navigate(['/app/mgmt/corporate']);
  }

}
