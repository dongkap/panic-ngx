import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, HttpBaseModel, Pattern, ResponseCode } from '@dongkap/do-core';
import { BaseFormComponent } from '@dongkap/do-shared';
import { ClientDetailsService } from '../services/client-details.service';
import { ClientDetailsModel } from '../models/client-details.model';

@Component({
  selector: 'do-client-details-edit-page',
  styleUrls: ['./client-details-edit-page.component.scss'],
  templateUrl: './client-details-edit-page.component.html',
})
export class ClientDetailsEditPageComponent extends BaseFormComponent<any> implements OnInit {

  public clientDetails: ClientDetailsModel = new ClientDetailsModel();
  public clientId: string;
  public apiClientDetails: HttpBaseModel;
  public passwordPattern: string = Pattern.PASSWORD_MEDIUM;
  public isClientSecret: boolean = true;

  constructor(
    public injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private clientDetailsService: ClientDetailsService) {
    super(injector,
      {
        clientId: [],
        clientSecret: [],
        resourceIds: [],
        scope: [],
        authorizedGrantTypes: [],
        authorities: [],
        accessTokenValidity: [],
        refreshTokenValidity: [],
      });
    this.clientId = this.route.snapshot.params['clientId'];
  }

  ngOnInit(): void {
    if (this.clientId != null) {
      this.action = 'Edit';
      this.isClientSecret = false;
      if (!this.clientDetailsService.getClientDetails()) {
        this.getRequestClientDetails(this.clientId);
      } else {
        this.putClientDetailsToForm();
      }
    }
  }

  getRequestClientDetails(clientId: string): void {
    this.onInitData('security', 'get-client-details', [clientId])
      .subscribe((response: any) => {
        this.clientDetailsService.setClientDetails(response);
        this.putClientDetailsToForm();
      });
  }

  putClientDetailsToForm(): void {
    this.clientDetails = this.clientDetailsService.getClientDetails();
    this.formGroup.get('clientId').setValue(this.clientId);
    this.formGroup.get('clientId').disable();
    this.formGroup.get('resourceIds').setValue(this.clientDetails.resourceIds);
    this.formGroup.get('scope').setValue(this.clientDetails.scope);
    this.formGroup.get('authorizedGrantTypes').setValue(this.clientDetails.authorizedGrantTypes);
    this.formGroup.get('authorities').setValue(this.clientDetails.authorities);
    this.formGroup.get('accessTokenValidity').setValue(this.clientDetails.accessTokenValidity);
    this.formGroup.get('refreshTokenValidity').setValue(this.clientDetails.refreshTokenValidity);
  }

  onReset(): void {
    this.router.navigate(['/app/mgmt/client-ids']);
  }

  onSubmit(): void {
    const clientSecret = this.formGroup.get('clientSecret').value;
    const resourceIds: string = this.formGroup.get('resourceIds').value;
    const scope = this.formGroup.get('scope').value;
    const authorizedGrantTypes = this.formGroup.get('authorizedGrantTypes').value;
    const authorities = this.formGroup.get('authorities').value;
    const accessTokenValidity = +this.formGroup.get('accessTokenValidity').value;
    const refreshTokenValidity = +this.formGroup.get('refreshTokenValidity').value;
    const data: any = {
      clientId: this.clientId,
      clientSecret,
      resourceIds,
      scope,
      authorizedGrantTypes,
      authorities,
      accessTokenValidity,
      refreshTokenValidity
    };
    (super.onSubmit(data, 'security', 'post-client-details')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.router.navigate(['/app/mgmt/client-ids']);
        }
      });
  }

}
