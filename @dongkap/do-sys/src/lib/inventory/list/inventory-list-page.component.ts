import { Component, Injector, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ApiBaseResponse, HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, DatatableColumn } from '@dongkap/do-shared';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'do-inventory-list-page',
  styleUrls: ['./inventory-list-page.component.scss'],
  templateUrl: './inventory-list-page.component.html',
})
export class InventoryListPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public apiPathDelete: HttpBaseModel;
  public columns: DatatableColumn[] = [
    { name: 'Asset Name', prop: 'assetName', width: 175, frozenLeft: true },
    { name: 'Condition', prop: 'assetConditionValue', width: 100, frozenLeft: true },
    { name: 'Quantity', prop: 'quantity', width: 75, frozenLeft: true },
    { name: 'Location', prop: 'location', width: 225, frozenLeft: true },
    { name: 'Created', prop: 'createdBy' },
    { name: 'Created Date', prop: 'createdDate' },
    { name: 'Modified', prop: 'modifiedBy' },
    { name: 'Modified Date', prop: 'modifiedDate' },
  ];
  public reload: boolean = false;
  public expanded: boolean = false;
  private assetIds: any[];

  constructor(
    public injector: Injector,
    private router: Router,
    private inventoryService: InventoryService,
    private dialogService: NbDialogService) {
    super(injector, {
      assetName: [],
      assetCondition: [],
    });
    this.apiPath = this.api['master']['datatable-inventory'];
    this.apiPathDelete = this.api['master']['delete-inventory'];
    this.sort = {
      asc: ['businessPartner.bpName']
    };
    this.filters = [
      { controlName: 'assetName', type: 'input' },
      { controlName: 'assetCondition', type: 'input' }];
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.inventoryService.setAsset(null);
    this.router.navigate(['/app/mgmt/inventory', 'add']);
  }

  onViewDetail(data): void {
    this.inventoryService.setAsset(data);
    this.router.navigate(['/app/mgmt/inventory', 'edit']);
  }

  onDeleteDialog(data, dialog: TemplateRef<any>): void {
    this.reload = false;
    this.assetIds = [];
    data.forEach(value => {
      this.assetIds.push(value.id);
    });
    this.dialogService.open(
      dialog,
      { context: 'alert.delete' });
  }

  onDelete(ref: NbDialogRef<any>): void {
    this.disabled = true;
    this.http.HTTP_AUTH(this.apiPathDelete, this.assetIds)
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
    this.router.navigate(['/app/mgmt/inventory']);
  }

}
