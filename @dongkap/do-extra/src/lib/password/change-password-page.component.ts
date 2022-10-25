import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  Pattern,
  EncryptionService,
  ResponseCode,
  OAUTH_INFO,
  SecurityResourceModel,
} from '@dongkap/do-core';
import { ApiBaseResponse } from '@dongkap/do-core';
import { BaseFormComponent } from '@dongkap/do-shared';

@Component({
  selector: 'do-change-password-page',
  styleUrls: ['./change-password-page.component.scss'],
  templateUrl: './change-password-page.component.html',
})
export class ChangePasswordPageComponent extends BaseFormComponent<any> {

  passwordPattern: string = Pattern.PASSWORD_MEDIUM;
  private enc: EncryptionService;
  private oauthResource: SecurityResourceModel;

  constructor(public injector: Injector) {
    super(injector, {
      password: [],
      newPassword: [],
      confirmPassword: [],
    });
    this.enc = injector.get(EncryptionService);
    this.oauthResource = injector.get(OAUTH_INFO);
  }

  onSubmit(): void {
    const data: any = {
      password: this.enc.encryptAES(this.oauthResource['aes_key'], this.formGroup.get('password').value),
      newPassword: this.enc.encryptAES(this.oauthResource['aes_key'], this.formGroup.get('newPassword').value),
      confirmPassword: this.enc.encryptAES(this.oauthResource['aes_key'], this.formGroup.get('confirmPassword').value),
    };
    (super.onSubmit(data, 'security', 'change-password') as Observable<ApiBaseResponse>)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: ApiBaseResponse) => {
              if (response) {
                switch (response.respStatusCode) {
                  case ResponseCode.ERR_SCR0002.toString():
                    this.formGroup.controls['password'].setErrors({
                      incorrect: true,
                    });
                    break;
                  case ResponseCode.ERR_SCR0006.toString():
                    this.formGroup.controls['newPassword'].setErrors({
                      equal: true,
                    });
                    break;
                  default:
                    break;
                }
              }
            });
  }

}
