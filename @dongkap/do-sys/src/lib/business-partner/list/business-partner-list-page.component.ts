import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionType } from '@swimlane/ngx-datatable';
import { HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, DatatableColumn } from '@dongkap/do-shared';
import { BusinessPartnerService } from '../services/business-partner.service';

@Component({
  selector: 'do-business-partner-list-page',
  styleUrls: ['./business-partner-list-page.component.scss'],
  templateUrl: './business-partner-list-page.component.html',
})
export class BusinessPartnerListPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public selectionType: SelectionType = SelectionType.single;
  public columns: DatatableColumn[] = [
    { name: 'Business Partner', prop: 'businessPartner.bpName', width: 275, frozenLeft: true },
    { name: 'Telp', prop: 'businessPartner.telpNumber', width: 100, frozenLeft: true },
    { name: 'Fax', prop: 'businessPartner.faxNumber', width: 100, frozenLeft: true },
    { name: 'Email', prop: 'businessPartner.email', width: 175 },
    { name: 'Address', prop: 'businessPartner.address' },
    { name: 'Created', prop: 'createdBy' },
    { name: 'Created Date', prop: 'createdDate' },
    { name: 'Modified', prop: 'modifiedBy' },
    { name: 'Modified Date', prop: 'modifiedDate' },
  ];
  public expanded: boolean = false;

  constructor(
    public injector: Injector,
    private router: Router,
    private businessPartnerService: BusinessPartnerService) {
    super(injector, {
      bpName: [],
    });
    this.sort = {
      asc: ['businessPartner.bpName']
    };
    this.apiPath = this.api['master']['datatable-business-partner'];
    this.filters = [
      { controlName: 'bpName', type: 'input' }];
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.businessPartnerService.setB2B(null);
    this.router.navigate(['/app/mgmt/business-partner', 'add']);
  }

  onViewDetail(data): void {
    this.businessPartnerService.setB2B(data);
    this.router.navigate(['/app/mgmt/business-partner', 'edit']);
  }

  onReset(): void {
    this.router.navigate(['/app/mgmt/business-partner']);
  }

}
