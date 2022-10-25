import { Component, Inject } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import {
  API,
  EncryptionService,
  HTTP_SERVICE,
  OAUTH_INFO,
  Pattern,
  ResponseCode,
} from '@dongkap/do-core';
import { ApiBaseResponse } from '@dongkap/do-core';
import { APIModel } from '@dongkap/do-core';
import { HttpFactoryService } from '@dongkap/do-core';
import { SecurityResourceModel } from '@dongkap/do-core';
import { DoToastrService } from '@dongkap/do-shared';

@Component({
    selector: 'do-forgot-page',
    styleUrls: ['forgot-page.component.scss'],
    templateUrl: 'forgot-page.component.html',
})
export class ForgotPageComponent implements OnDestroy {

  public responseError: any;
  public buttonForgotPassword: boolean = false;
  private progressBar: number = 25;
  protected progressDOM: HTMLElement;

  public patternPassword: string = Pattern.PASSWORD_MEDIUM;
  public errorMsgNewPassword: string;
  public errorMsgConfirmPassword: string;

  private verificationId: string;
  private verificationCode: string;

  public form: FormGroup = new FormGroup({
    newPassword: new FormControl(),
    confirmPassword: new FormControl(),
  });

  protected destroy$: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: DoToastrService,
    private translate: TranslateService,
    private enc: EncryptionService,
    @Inject(HTTP_SERVICE)private httpBaseService: HttpFactoryService,
    @Inject(OAUTH_INFO)private oauthResource: SecurityResourceModel,
    @Inject(API)private apiPath: APIModel) {
    if (this.route.snapshot.params['id'] !== null && this.route.snapshot.params['code'] !== null) {
      this.verificationId = this.route.snapshot.params['id'];
      this.verificationCode = this.route.snapshot.params['code'];
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  public forgotPassword() {
    if (!this.form.invalid) {
      this.initProgress();
      if (this.progressBar < 35) {
        this.setProgress(this.progressBar = 35);
      }

      this.responseError = null;

      const newPassword: string = this.enc.encryptAES(this.oauthResource['aes_key'], this.form.controls['newPassword'].value);
      const confirmPassword: string = this.enc.encryptAES(this.oauthResource['aes_key'], this.form.controls['confirmPassword'].value);
      const data: any = {
        verificationId: this.verificationId,
        verificationCode: this.verificationCode,
        newPassword,
        confirmPassword,
      };
      const httpHeaders: HttpHeaders = new HttpHeaders({
        Authorization: 'Basic ' + btoa(this.oauthResource['client_id'] + ':' + this.oauthResource['client_secret']),
        'Content-Type': 'application/json',
        'Accept-Language': this.translate.currentLang,
      });
      this.buttonForgotPassword = true;
      this.httpBaseService.HTTP_BASE(this.apiPath['auth']['forgot-password'], data, httpHeaders)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: ApiBaseResponse) => {
          if (response) {
            this.toastr.showI18n(response.respStatusMessage[response.respStatusCode]);
            this.setProgress(this.progressBar = 95);
            this.progressBar = 0;
            if (response.respStatusCode === ResponseCode.OK_FORGOT_PASSWORD) {
              this.router.navigate(['/auth/login']);
            } else {
              this.form.reset();
              this.buttonForgotPassword = false;
            }
          } else {
            this.form.reset();
            this.buttonForgotPassword = false;
          }
        },
        (error: any) => {
          this.buttonForgotPassword = false;
          this.progressBar = 0;
          this.doneProgress();

          if (!(error instanceof HttpErrorResponse)) {
            if (error['respStatusCode']) {
              this.responseError = error['respStatusMessage'][error['respStatusCode']];
            }
          }
        });
    }
  }

  get hasErrorNewPassword(): boolean {
    if (this.form.controls['newPassword'].errors &&
      this.form.controls['newPassword'].invalid &&
      this.form.controls['newPassword'].touched) {
      this.errorMsgNewPassword = 'error.pattern.Password';
    } else {
      this.errorMsgNewPassword = null;
    }
    return (
      this.form.controls['newPassword'] &&
      this.form.controls['newPassword'].invalid &&
      this.form.controls['newPassword'].touched
    );
  }

  get hasSuccessNewPassword(): boolean {
    return (
      this.form.controls['newPassword'] &&
      this.form.controls['newPassword'].valid &&
      this.form.controls['newPassword'].touched
    );
  }

  get hasErrorConfirmPassword(): boolean {
    if (
      this.form.controls['confirmPassword'].errors &&
      this.form.controls['confirmPassword'].invalid &&
      this.form.controls['confirmPassword'].touched) {
      this.errorMsgConfirmPassword = 'error.equal.confirmPassword';
    } else {
      if (this.form.controls['newPassword'].value !== this.form.controls['confirmPassword'].value) {
        this.errorMsgConfirmPassword = 'error.equal.confirmPassword';
        this.form.controls['confirmPassword'].setValidators([confirmPasswordValidator(this.form)]);
        this.form.controls['confirmPassword'].updateValueAndValidity();
      } else {
        this.errorMsgConfirmPassword = null;
      }
    }
    return (
      this.form.controls['confirmPassword'] &&
      this.form.controls['confirmPassword'].invalid &&
      this.form.controls['confirmPassword'].touched
    );
  }

  get hasSuccessConfirmPassword(): boolean {
    return (
      this.form.controls['confirmPassword'] &&
      this.form.controls['confirmPassword'].valid &&
      this.form.controls['confirmPassword'].touched
    );
  }

  protected initProgress(): void {
    document.querySelectorAll('.pace-done').forEach(pace => {
    pace.className = pace.className.replace('pace-done pace-done', 'pace-running');
    pace.className = pace.className.replace('pace-done', 'pace-running');
    });
    document.querySelectorAll('.pace-inactive').forEach(pace => {
    pace.className = pace.className.replace('pace-inactive pace-inactive', 'pace-active');
    pace.className = pace.className.replace('pace-inactive', 'pace-active');
    });
    this.progressDOM = document.getElementsByClassName('pace-progress').item(0) as HTMLElement;
  }

  protected doneProgress() {
    document.querySelectorAll('.pace-running').forEach(pace => {
    pace.className = pace.className.replace('pace-running', 'pace-done');
    });
    document.querySelectorAll('.pace-active').forEach(pace => {
    pace.className = pace.className.replace('pace-active', 'pace-inactive');
    });
  }

  protected setProgress(progress: number) {
    this.progressDOM.style.transform = 'translate3d(' + progress + '%, 0px, 0px)';
    this.progressDOM.getAttributeNode('data-progress-text').value = progress + '%';
    this.progressDOM.getAttributeNode('data-progress').value = progress.toString();
  }

}

export function confirmPasswordValidator(form: FormGroup): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (form.controls) {
      if (form.controls['newPassword'].value !== form.controls['confirmPassword'].value){
        return { equal: true };
      }
    }
    return null;
  };
}
