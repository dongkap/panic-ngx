import { Component, Inject, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiBaseResponse, AUTH_INDEXED_DB, IndexedDBEncFactoryService, PROFILE_INDEXED_DB } from '@dongkap/do-core';
import { DoToastrService } from '@dongkap/do-shared';
import { AuthTokenService } from '../../services/auth-token.service';
import { AuthForceService } from '../../services/auth-force.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'do-locked-page',
    styleUrls: ['./locked-page.component.scss'],
    templateUrl: 'locked-page.component.html',
})
export class LockedPageComponent implements OnInit, OnDestroy {

  public responseError: any;
  public responseErrorCode: any;
  public buttonLock: boolean = false;
  public showPassword: boolean = false;
  public icon: string = 'eye-outline';
  private progress: number = 25;
  protected progressDOM: HTMLElement;
  protected destroy$: Subject<any> = new Subject<any>();
  public username: string;
  public name: string;
  public formGroup: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    @Inject(AUTH_INDEXED_DB) private authIndexedDB: IndexedDBEncFactoryService,
    @Inject(PROFILE_INDEXED_DB) private profileIndexedDB: IndexedDBEncFactoryService,
    private authTokenService: AuthTokenService,
    private translate: TranslateService,
    private toastr: DoToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.authIndexedDB.get('username').then((value: string) => {
      this.username = value;
    });
    this.profileIndexedDB.get('name').then((value: string) => {
      this.name = value;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  public unlock() {
    if (!this.formGroup.invalid) {
      this.initProgress();
      if (this.progress < 35) {
        this.setProgress(this.progress = 35);
      }
      this.buttonLock = true;
      this.authTokenService.unlock(
        this.username,
        this.formGroup.get('password').value)
        .then(() => {
          this.setProgress(this.progress = 95);
          this.progress = 0;
          this.responseError = null;
          this.router.navigate(['/app/home']);
        })
        .catch((error: any) => {
          try {
            if (error instanceof HttpErrorResponse) {
              error = error['error'] as ApiBaseResponse;
            }
            const response: ApiBaseResponse = (error as ApiBaseResponse);
            if(response.respStatusCode === 'invalid_grant') {
              this.translate.get('error.unlock').subscribe((result: string) => {
                response.respStatusMessage[response.respStatusCode] = result;
              });
            }
            this.responseError = response?.respStatusMessage[response?.respStatusCode];
          } catch (error) {
            this.responseError = 'error.500';
          }
          this.toastr.showI18n(this.responseError, true, null, 'danger');
          this.buttonLock = false;
          this.progress = 0;
          this.doneProgress();
        });
      if (this.progress >= 35 && this.progress < 65) {
        this.setProgress(this.progress = 65);
      }
    }
  }

  onShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.icon = this.showPassword ? 'eye-off-outline' :  'eye-outline';
  }

  get hasErrorPassword(): boolean {
    return (
      this.formGroup.controls['password'] &&
      this.formGroup.controls['password'].invalid &&
      this.formGroup.controls['password'].touched
    );
  }

  get hasSuccessPassword(): boolean {
    return (
      this.formGroup.controls['password'] &&
      this.formGroup.controls['password'].valid &&
      this.formGroup.controls['password'].touched
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
