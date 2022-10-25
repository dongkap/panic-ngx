import { Component, Inject, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Idle } from '@ng-idle/core';
import { API, APIModel, HttpFactoryService, HTTP_SERVICE, OAUTH_INFO, SecurityResourceModel } from '@dongkap/do-core';
import { AuthIndexedDBService } from '../../services/storage/auth-indexeddb.service';
import { ProfileIndexedDBService } from '../../services/storage/profile-indexeddb.service';
import { SettingsIndexedDBService } from '../../services/storage/settings-indexeddb.service';

@Component({
  selector: 'do-oauth2-callback',
  styleUrls: ['oauth2-callback.component.scss'],
  templateUrl: 'oauth2-callback.component.html',
})
export class OAuth2CallbackComponent implements OnDestroy {

  protected destroy$: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    route: ActivatedRoute,
    @Inject(HTTP_SERVICE)private httpBaseService: HttpFactoryService,
    @Inject(OAUTH_INFO)private oauthResource: SecurityResourceModel,
    @Inject(API)private apiPath: APIModel,
    private authIndexedDB: AuthIndexedDBService,
    private profileIndexedDB: ProfileIndexedDBService,
    private settingsIndexedDB: SettingsIndexedDBService,
    private idle: Idle) {
    if (route.snapshot.queryParams['access_token']) {
      this.extractToken(route.snapshot.queryParams['access_token']);
    } else if (route.snapshot.queryParams['error']) {
      this.router.navigate(['/auth'], { queryParams: { error: route.snapshot.queryParams['error'] }});
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.next();
    this.destroy$.complete();
  }

  private extractToken(accessToken: string) {
    return this.httpBaseService.
    HTTP_BASE(this.apiPath['auth']['extract-token'],
        this.getAuthBody(accessToken).toString(),
        this.getAuthHeader())
            .pipe(takeUntil(this.destroy$))
            .toPromise()
            .then((response: HttpResponse<any>) => {
                this.idle.setIdle(+response['expires_in']);
                this.idle.watch();
                /* console.log('[DONGKAP] Session Idle Start'); */
                /* console.log('[DONGKAP] Session Timeout in ' + response['expires_in'] + ' seconds'); */
                this.authIndexedDB.loginStorage(response);
                this.profileIndexedDB.loginStorage(response);
                this.settingsIndexedDB.loginStorage(response);
                this.router.navigate(['/app/home']);
            })
            .catch((error: any) => {
              this.router.navigate(['/auth']);
            });
  }

  private getAuthBody(accessToken: string): URLSearchParams {
    const body = new URLSearchParams();
    body.append('access_token', accessToken);
    return body;
  }

  private getAuthHeader(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' +
            btoa(this.oauthResource['client_id'] + ':' + this.oauthResource['client_secret']),
        Accept: 'application/json',
    });
}
}
