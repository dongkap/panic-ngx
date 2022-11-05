import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, ResponseCode } from '@dongkap/do-core';
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

  constructor(
    public injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private clientDetailsService: ClientDetailsService) {
    super(injector,
      {
        accessTokenValidity: [],
        refreshTokenValidity: [],
        resourceIds: [],
      });
    if (this.clientDetailsService.getClientDetails()) {
      const clientDetails: ClientDetailsModel = this.clientDetailsService.getClientDetails();
      this.clientDetails = clientDetails;
      this.formGroup.get('accessTokenValidity').setValue(clientDetails.access_token_validity);
      this.formGroup.get('refreshTokenValidity').setValue(clientDetails.refresh_token_validity);
      this.formGroup.get('resourceIds').setValue(clientDetails.resource_ids.toString());
    } else {
      this.router.navigate(['/app/mgmt/client-ids']);
    }
  }

  ngOnInit(): void {}

  onReset(): void {
    this.router.navigate(['/app/mgmt/client-ids']);
  }

  onSubmit(): void {
    const resourceIds: string = this.formGroup.get('resourceIds').value;
    const resource_ids: string[] = resourceIds.split(',');
    this.clientDetails.access_token_validity = +this.formGroup.get('accessTokenValidity').value;
    this.clientDetails.refresh_token_validity = +this.formGroup.get('refreshTokenValidity').value;
    this.clientDetails.resource_ids = resource_ids;
    (super.onSubmit(this.clientDetails, 'security', 'post-client-details')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.router.navigate(['/app/mgmt/client-ids']);
        }
      });
  }

}
