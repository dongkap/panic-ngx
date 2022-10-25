import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import {
    API,
    APIModel,
    HttpFactoryService,
    HTTP_SERVICE,
    oauthInfo,
    OAUTH_INFO,
    SecurityResourceModel,
    signatureHeader,
} from '@dongkap/do-core';
import { AuthIndexedDBService } from './storage/auth-indexeddb.service';
import { ProfileIndexedDBService } from './storage/profile-indexeddb.service';
import { SettingsIndexedDBService } from './storage/settings-indexeddb.service';

@Injectable()
export class AuthTokenService implements OnDestroy {

    private timer: any;
    protected destroy$: Subject<any> = new Subject<any>();

    constructor(
        @Inject(HTTP_SERVICE)private httpBaseService: HttpFactoryService,
        @Inject(OAUTH_INFO)private oauthResource: SecurityResourceModel,
        @Inject(API)private apiPath: APIModel,
        private router: Router,
        private authIndexedDB: AuthIndexedDBService,
        private profileIndexedDB: ProfileIndexedDBService,
        private settingsIndexedDB: SettingsIndexedDBService,
        private idle: Idle) {
        idle.setIdle(oauthResource['session_idle']);
        idle.setTimeout(oauthResource['session_timeout']);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        idle.onTimeout.subscribe(() => {
            /* console.log('[Dongkap] Session Timeout'); */
            this.logout();
        });
        idle.onIdleEnd.subscribe(() => {
            /* console.log('[Dongkap] Session Idle End'); */
        });
    }

    ngOnDestroy(): void {
        clearInterval(this.timer);
        this.destroy$.next(true);
        this.destroy$.next();
        this.destroy$.complete();
    }

    public login(username: string, password: string): Promise<any> {
        this.authIndexedDB.logout();
        return this.httpBaseService.
        HTTP_BASE(this.apiPath['auth']['token'],
            this.getAuthBody(username, password).toString(),
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
                });
    }

    public force(username: string, password: string): Promise<any> {
        this.authIndexedDB.logout();
        return this.httpBaseService.
        HTTP_BASE(this.apiPath['auth']['force'],
            this.getAuthBody(username, password).toString(),
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
                });
    }

    public refresh(): Observable<any> {
        return this.getBodyRefresh().pipe(switchMap((body: any) => {
            return this.httpBaseService.
            HTTP_BASE(this.apiPath['auth']['token'],
                body,
                this.getAuthHeader())
                .pipe(takeUntil(this.destroy$))
                .pipe(map((response: any) => {
                    this.idle.setIdle(response['expires_in']);
                    this.authIndexedDB.logout();
                    this.authIndexedDB.loginStorage(response);
                }));
        }));
    }

    public logout() {
        this.timer = setInterval(() => {
            this.doLogout();
        }, 5000);
        this.httpBaseService.HTTP_AUTH(this.apiPath['security']['revoke'])
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.doLogout();
            });
    }

    private doLogout() {
        this.authIndexedDB.logout();
        this.profileIndexedDB.logout();
        clearInterval(this.timer);
        this.idle.stop();
        this.router.navigate(['/auth']);
    }

    public async isLogin(): Promise<boolean> {
        return await this.authIndexedDB.isLogin();
    }

    public oauthHeaders(request: HttpRequest<any>): Observable<HttpRequest<any>> {
        const result$: Subject<HttpRequest<any>> = new Subject<HttpRequest<any>>();
        let httpHeaders: HttpHeaders = request.headers ? request.headers : new HttpHeaders();
        httpHeaders = httpHeaders.has(signatureHeader.authorization) ?
                        httpHeaders.delete(signatureHeader.authorization) : httpHeaders;
        Promise.all([
            this.authIndexedDB.getEnc(oauthInfo.token_type),
            this.authIndexedDB.getEnc(oauthInfo.access_token)])
        .then((value: string[]) => {
            httpHeaders = httpHeaders.set(signatureHeader.authorization, value[0] + ' ' + value[1]);
            result$.next(request.clone({ headers: httpHeaders }));
        });
        return result$.asObservable();
    }

    private getAuthHeader(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' +
                btoa(this.oauthResource['client_id'] + ':' + this.oauthResource['client_secret']),
            Accept: 'application/json',
        });
    }

    private getAuthBody(username: string, password: string): URLSearchParams {
        const body = new URLSearchParams();
        body.append('client_id', this.oauthResource['client_id']);
        body.append('grant_type', this.oauthResource['grant_type']);
        body.append('username', username);
        body.append('password', password);
        body.append('platform', 'web');
        return body;
    }

    private getBodyRefresh(): Observable<string> {
        const result$: Subject<string> = new Subject<string>();
        this.authIndexedDB.getEnc(oauthInfo.refresh_token).then((value: string) => {
            const body: URLSearchParams = new URLSearchParams();
            body.append('client_id', this.oauthResource['client_id']);
            body.append('grant_type', 'refresh_token');
            body.append('refresh_token', value);
            result$.next(body.toString());
        });
        return result$.asObservable();
    }

}
