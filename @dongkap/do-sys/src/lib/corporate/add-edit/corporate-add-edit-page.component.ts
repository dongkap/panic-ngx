import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, ResponseCode, Pattern } from '@dongkap/do-core';
import { BaseFormComponent, CheckboxModel } from '@dongkap/do-shared';
import { CorporateService } from '../services/corporate.service';
import { CorporateModel } from '../models/corporate.model';

@Component({
  selector: 'do-corporate-add-edit-page',
  styleUrls: ['./corporate-add-edit-page.component.scss'],
  templateUrl: './corporate-add-edit-page.component.html',
})
export class CorporateAddEditPageComponent extends BaseFormComponent<any> implements OnInit {

  public action: 'Add' | 'Edit' = 'Add';
  public patternEmail: string = Pattern.EMAIL;
  public patternPhoneNumber: string = Pattern.PHONE_NUMBER;
  public dataDefault: CheckboxModel[] = [
    {
      id: 'corporateNonExpired',
      selected: true,
    },
  ];
  constructor(
    public injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private corporateService: CorporateService) {
    super(injector,
      {
        corporateCode: [],
        corporateName: [],
        corporateNonExpired: [],
        email: [],
        address: [],
        telpNumber: [],
        faxNumber: [],
      });
    if (this.corporateService.getCorporate() || (this.route.snapshot.params['action'] === 'add')) {
      if ((this.route.snapshot.params['action'] === 'edit')) {
        this.action = 'Edit';
        this.formGroup.get('corporateCode').setValue(this.corporateService.getCorporate().corporateCode);
        this.formGroup.get('corporateName').setValue(this.corporateService.getCorporate().corporateName);
        this.formGroup.get('email').setValue(this.corporateService.getCorporate().email);
        this.formGroup.get('address').setValue(this.corporateService.getCorporate().address);
        this.formGroup.get('telpNumber').setValue(this.corporateService.getCorporate().telpNumber);
        this.formGroup.get('faxNumber').setValue(this.corporateService.getCorporate().faxNumber);
        this.formGroup.get('corporateNonExpired').setValue([{
          id: 'corporateNonExpired',
          selected: this.corporateService.getCorporate().corporateNonExpired ? true : false,
        }]);
        this.formGroup.get('corporateCode').disable();
      }
    } else {
      this.router.navigate(['/app/mgmt/corporate']);
    }
  }

  ngOnInit(): void {}

  onReset(): void {
    this.router.navigate(['/app/mgmt/corporate']);
  }

  onSubmit(): void {
    const corporateNonExpired: CheckboxModel[] = this.formGroup.get('corporateNonExpired').value;
    const data: CorporateModel = {
      corporateCode: this.formGroup.get('corporateCode').value,
      corporateName: this.formGroup.get('corporateName').value,
      corporateNonExpired: (corporateNonExpired ? true : false),
      email: this.formGroup.get('email').value,
      address: this.formGroup.get('address').value,
      telpNumber: this.formGroup.get('telpNumber').value,
      faxNumber: this.formGroup.get('faxNumber').value
    };
    (super.onSubmit(data, 'security', 'post-corporate')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.router.navigate(['/app/mgmt/corporate']);
        }
      });
  }

}
