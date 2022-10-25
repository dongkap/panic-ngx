import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiBaseResponse } from '@dongkap/do-core';
import { DoToastrService } from '@dongkap/do-shared';
import { AuthTokenService } from '../../services/auth-token.service';
import { AuthForceService } from '../../services/auth-force.service';

@Component({
    selector: 'do-force-login-page',
    styleUrls: ['./force-login-page.component.scss'],
    templateUrl: 'force-login-page.component.html',
})
export class ForceLoginPageComponent implements OnDestroy {

  public responseError: any;
  public responseErrorCode: any;
  public buttonForceLogin: boolean = false;
  private progress: number = 25;
  protected progressDOM: HTMLElement;
  protected destroy$: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private authTokenService: AuthTokenService,
    private authForceService: AuthForceService,
    private toastr: DoToastrService) {
      if (this.authForceService.isEmpty()) {
        this.router.navigate(['/auth']);
      }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  public forcelogin() {
    if (!this.authForceService.isEmpty()) {
      this.initProgress();
      if (this.progress < 35) {
        this.setProgress(this.progress = 35);
      }
      this.buttonForceLogin = true;
      this.authTokenService.force(
        this.authForceService.username,
        this.authForceService.password)
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
            this.responseError = response?.respStatusMessage[response?.respStatusCode];
          } catch (error) {
            this.responseError = 'error.500';
          }
          this.toastr.showI18n(this.responseError, true, null, 'danger');
          this.buttonForceLogin = false;
          this.progress = 0;
          this.doneProgress();
        });
      if (this.progress >= 35 && this.progress < 65) {
        this.setProgress(this.progress = 65);
      }
    }
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
