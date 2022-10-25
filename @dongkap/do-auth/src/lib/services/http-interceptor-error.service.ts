import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorHandler } from './http-error.handler';
import { AuthTokenService } from './auth-token.service';
import { AuthSignatureService } from './auth-signature.service';
import { AuthIndexedDBService } from './storage/auth-indexeddb.service';

@Injectable()
export class HttpInterceptorErrorService extends HttpErrorHandler implements HttpInterceptor, OnDestroy {

    constructor(
        public translate: TranslateService,
        public authToken: AuthTokenService,
        public authStorage: AuthIndexedDBService,
        public authSignature: AuthSignatureService) {
        super(translate, authToken, authStorage, authSignature);
    }

    private destroy$: Subject<any> = new Subject<any>();

    ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
      this.destroy$.unsubscribe();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    return this.errorHandler(error, req, next);
                } else {
                    return throwError(error);
                }
        })).pipe(takeUntil(this.destroy$));
    }

}
