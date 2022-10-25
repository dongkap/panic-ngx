import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import {
    DateFormat,
    EncryptionService,
    oauthInfo,
    OAUTH_INFO,
    SecurityResourceModel,
    signatureHeader,
} from '@dongkap/do-core';
import { AuthIndexedDBService } from './storage/auth-indexeddb.service';

@Injectable()
export class AuthSignatureService {

    constructor(
        private translate: TranslateService,
        private enc: EncryptionService,
        @Inject(OAUTH_INFO) private oauthResource: SecurityResourceModel,
        private authStorage: AuthIndexedDBService) {}

    private timeStamp: any;

    public signHeaders(req: HttpRequest<any>): Observable<HttpRequest<any>> {
        return combineLatest([
            this.key(),
            this.signature(this.getPath(req.url)),
        ]).pipe(
            take(1),
            switchMap((value: string[]) => {
            if (signatureHeader.signature) {
                let httpHeaders: HttpHeaders = req.headers ? req.headers : new HttpHeaders();
                httpHeaders.keys().forEach((key: string) => {
                    if (key === signatureHeader.key) {
                        httpHeaders = httpHeaders.delete(signatureHeader.key);
                    }
                    if (key === signatureHeader.timestamp) {
                        httpHeaders = httpHeaders.delete(signatureHeader.timestamp);
                    }
                    if (key === signatureHeader.signature) {
                        httpHeaders = httpHeaders.delete(signatureHeader.signature);
                    }
                });
                httpHeaders = httpHeaders.set(signatureHeader.key, value[0]);
                httpHeaders = httpHeaders.set(signatureHeader.timestamp, this.timeStamp);
                httpHeaders = httpHeaders.set(signatureHeader.signature, value[1]);
                return of(req.clone({ headers: httpHeaders }));
            }
            return of(req);
        }));
    }

    public key(): Observable<string> {
        return this.authStorage.getOfEnc(oauthInfo.public_key);
    }

    public timestamp(): string {
        this.timeStamp = Math.floor(new Date().getTime() / 1000).toString();
        return this.timeStamp;
    }

    public date(): string {
        return new DatePipe(this.translate.currentLang).transform(new Date(), DateFormat.DATE);
    }

    public signature(url: string): Observable<string> {
        return combineLatest([
            this.key(),
            this.authStorage.getOfEnc(oauthInfo.access_token),
        ]).pipe(
            take(1),
            switchMap((value: string[]) => {
            const key = value[0] + ':' +
                         this.timestamp() + ':' +
                        // this.date() + ':' +
                        url + ':' +
                        value[1];
            return of(this.enc.getHmacSha256(this.oauthResource['private_key'], key));
        }));
    }

    private getPath(url: string): string {
        return '/' + url
        .replace(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*(:[0-9]{1,5})?(\/).*?/g, '');
    }

}
