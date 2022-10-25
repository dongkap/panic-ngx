import { HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { filter, take, switchMap, catchError } from 'rxjs/operators';
import { ApiBaseResponse } from '@dongkap/do-core';
import { AuthTokenService } from './auth-token.service';
import { AuthSignatureService } from './auth-signature.service';
import { AuthIndexedDBService } from './storage/auth-indexeddb.service';

export class HttpErrorHandler {

    protected isRefreshingToken: boolean = false;
    protected refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        protected translate: TranslateService,
        protected authToken: AuthTokenService,
        protected authStorage: AuthIndexedDBService,
        protected authSignature: AuthSignatureService) {}

    protected errorHandler(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        let err: HttpErrorResponse = new HttpErrorResponse({
            error: error.error,
            headers: error.headers,
            status: error.status,
            statusText: error.statusText,
            url: error.url,
        });

        if (error.error instanceof ArrayBuffer) {
            const decodedString = String.fromCharCode.apply(null, new Uint8Array(error.error));
            err = new HttpErrorResponse({
                error: JSON.parse(decodedString),
                headers: error.headers,
                status: error.status,
                statusText: error.statusText,
                url: error.url,
            });
        }
        switch (err.status) {
            case 200:
            case 201:
            case 304:
                return EMPTY;
            case 400:
                return this.error400(err);
            case 401:
                return this.error401(err, req, next);
            case 404:
            case 403:
            case 500:
            case 504:
            case 0:
                return throwError(this.errorDefault(err));
            default:
                break;
        }
        return throwError(err);
    }

    protected errorDefault(error: any | HttpErrorResponse): ApiBaseResponse {
        let err: ApiBaseResponse = {
            respStatusCode: error.status,
            respStatusMessage: {},
        };
        err.respStatusMessage[err.respStatusCode] = error.statusText;
        let msgKey: string = 'error.' + err.respStatusCode;
        if (error.error) {
            if (error.error['respStatusCode']) {
                err = error.error;
                msgKey = err.respStatusMessage[err.respStatusCode];
            }
        }
        this.translate.get(msgKey).subscribe((result: string) => {
            err.respStatusMessage[err.respStatusCode] = result;
        });
        return err;
    }

    protected error400(error: HttpErrorResponse): Observable<HttpEvent<any>> {
        if (error.error['respStatusCode']) {
            if (error.error['respStatusCode'] === 'invalid_grant') {
                switch (error.error['respStatusMessage']['invalid_grant']) {
                    case 'Bad credentials':
                    case 'User account is locked':
                    case 'User is disabled':
                    case 'User account has expired':
                    case 'User credentials have expired':
                    case 'LDAP Server Error':
                    case 'Invalid credentials.':
                        return throwError(this.errorDefault(error));
                    default:
                        this.authToken.logout();
                        return throwError(this.errorDefault(error));
                }
            } else {
                return throwError(this.errorDefault(error));
            }
        }
        return throwError(error);
    }

    protected error401(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        if (error.error) {
            if (error.error['respStatusCode'] === 'invalid_token') {
                if (!this.isRefreshingToken) {
                    this.isRefreshingToken = true;
                    this.refreshTokenSubject.next(null);
                    return this.authToken.refresh().pipe(
                        switchMap((response: any) => {
                            this.isRefreshingToken = false;
                            this.refreshTokenSubject.next(response);
                            return this.authToken.oauthHeaders(request).pipe(
                                switchMap((req: any) => {
                                    request = req;
                                    return this.authSignature.signHeaders(request).pipe(
                                        switchMap((valReq: any) => {
                                            return next.handle(valReq);
                                        }),
                                    );
                                }));
                        }),
                        catchError((err: HttpErrorResponse) => {
                            return this.errorHandler(err, request, next);
                        }));
                } else {
                    const msg: string = error.error['respStatusMessage']['invalid_token'];
                    if (msg.includes('expired')) {
                        this.authToken.logout();
                    } else {
                        return this.refreshTokenSubject.pipe(
                            filter(response => response != null),
                            take(1),
                            switchMap(() => {
                                return this.authToken.oauthHeaders(request).pipe(
                                    switchMap((req: any) => {
                                        request = req;
                                        return this.authSignature.signHeaders(request).pipe(
                                            switchMap((valReq: any) => {
                                                return next.handle(valReq);
                                            }),
                                        );
                                    }));
                            }));
                    }
                }
            }
        }
        return throwError(error);
    }
}
