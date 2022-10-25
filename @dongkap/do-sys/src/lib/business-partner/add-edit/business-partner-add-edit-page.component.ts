import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, ResponseCode, Pattern } from '@dongkap/do-core';
import { BaseFormComponent, CheckboxModel } from '@dongkap/do-shared';
import { BusinessPartnerService } from '../services/business-partner.service';
import { B2BModel } from '../models/business-partner.model';

@Component({
  selector: 'do-business-partner-add-edit-page',
  styleUrls: ['./business-partner-add-edit-page.component.scss'],
  templateUrl: './business-partner-add-edit-page.component.html',
})
export class BusinessPartnerAddEditPageComponent extends BaseFormComponent<any> implements OnInit {

  public action: 'Add' | 'Edit' = 'Add';
  public patternEmail: string = Pattern.EMAIL;
  public patternPhoneNumber: string = Pattern.PHONE_NUMBER;
  public dataDefault: CheckboxModel[] = [
    {
      id: 'b2bNonExpired',
      selected: true,
    },
  ];
  public isB2bNonExpired: boolean = true;
  constructor(
    public injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private businessPartnerService: BusinessPartnerService) {
    super(injector,
      {
        bpName: [],
        email: [],
        address: [],
        telpNumber: [],
        faxNumber: [],
        b2bNonExpired: [],
        expiredTime: [],
      });
    if (this.businessPartnerService.getB2B() || (this.route.snapshot.params['action'] === 'add')) {
      if ((this.route.snapshot.params['action'] === 'edit')) {
        this.action = 'Edit';
        this.formGroup.get('bpName').setValue(this.businessPartnerService.getB2B().businessPartner.bpName);
        this.formGroup.get('email').setValue(this.businessPartnerService.getB2B().businessPartner.email);
        this.formGroup.get('address').setValue(this.businessPartnerService.getB2B().businessPartner.address);
        this.formGroup.get('telpNumber').setValue(this.businessPartnerService.getB2B().businessPartner.telpNumber);
        this.formGroup.get('faxNumber').setValue(this.businessPartnerService.getB2B().businessPartner.faxNumber);
        this.formGroup.get('b2bNonExpired').setValue([{
          id: 'b2bNonExpired',
          selected: this.businessPartnerService.getB2B().b2bNonExpired ? true : false,
        }]);
        this.formGroup.get('expiredTime').setValue(this.businessPartnerService.getB2B().expiredTime);
        this.isB2bNonExpired = this.businessPartnerService.getB2B().b2bNonExpired;
      } else {
        this.formGroup.get('b2bNonExpired').setValue(this.dataDefault);
      }
    } else {
      this.router.navigate(['/app/mgmt/business-partner']);
    }
  }

  ngOnInit(): void {}

  onReset(): void {
    this.router.navigate(['/app/mgmt/business-partner']);
  }

  onCheckB2bNonExpired(event: CheckboxModel[]): void {
    this.isB2bNonExpired = event ? true : false;
  }

  onSubmit(): void {
    const b2bNonExpired: CheckboxModel[] = this.formGroup.get('b2bNonExpired').value;
    const data: B2BModel = {
      id: this.businessPartnerService.getB2B()?.id,
      b2bNonExpired: (b2bNonExpired ? true : false),
      expiredTime: !this.isB2bNonExpired ? this.formGroup.get('expiredTime').value : null,
      businessPartner: {
        bpName: this.formGroup.get('bpName').value,
        email: this.formGroup.get('email').value,
        address: this.formGroup.get('address').value,
        telpNumber: this.formGroup.get('telpNumber').value,
        faxNumber: this.formGroup.get('faxNumber').value
      },
    };
    (super.onSubmit(data, 'master', 'post-business-partner')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.router.navigate(['/app/mgmt/business-partner']);
        }
      });
  }

}
