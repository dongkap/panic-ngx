import { Component, Inject } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import {
  API,
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
    selector: 'do-request-forgot-page',
    styleUrls: ['request-forgot-page.component.scss'],
    templateUrl: 'request-forgot-page.component.html',
})
export class RequestForgotPageComponent implements OnDestroy {

  public responseError: any;
  public buttonForgotPassword: boolean = false;
  private progressBar: number = 25;
  protected progressDOM: HTMLElement;

  public patternEmail: string = Pattern.EMAIL;

  public form: FormGroup = new FormGroup({
    email: new FormControl(),
  });

  protected destroy$: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private toastr: DoToastrService,
    private translate: TranslateService,
    @Inject(HTTP_SERVICE)private httpBaseService: HttpFactoryService,
    @Inject(OAUTH_INFO)private oauthResource: SecurityResourceModel,
    @Inject(API)private apiPath: APIModel) {}

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

      // const urlForgotPassword: string = `${document.getElementsByTagName('base')[0].href}auth/forgot-password`;
      const data: any = {
        email: this.form.controls['email'].value,
      };
      const httpHeaders: HttpHeaders = new HttpHeaders({
        Authorization: 'Basic ' + btoa(this.oauthResource['client_id'] + ':' + this.oauthResource['client_secret']),
        'Content-Type': 'application/json',
        'Accept-Language': this.translate.currentLang,
      });
      this.buttonForgotPassword = true;
      this.httpBaseService.HTTP_BASE(this.apiPath['auth']['request-forgot-password'], data, httpHeaders)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: ApiBaseResponse) => {
          if (response) {
            this.toastr.showI18n(response.respStatusMessage[response.respStatusCode]);
            this.setProgress(this.progressBar = 95);
            this.progressBar = 0;
            if (response.respStatusCode === ResponseCode.OK_REQUEST_FORGOT_PASSWORD) {
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
          } else {
          }
        });
    }
  }

  get hasErrorEmail(): boolean {
    return (
      this.form.controls['email'] &&
      this.form.controls['email'].invalid &&
      this.form.controls['email'].touched
    );
  }

  get hasSuccessEmail(): boolean {
    return (
      this.form.controls['email'] &&
      this.form.controls['email'].valid &&
      this.form.controls['email'].touched
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
