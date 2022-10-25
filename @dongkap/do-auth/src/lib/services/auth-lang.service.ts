import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { Pattern } from '@dongkap/do-core';
import { SettingsIndexedDBService } from './storage/settings-indexeddb.service';

@Injectable()
export class AuthLanguageService {

    constructor(
        @Inject(LOCALE_ID) private locale: string,
        private settingsIndexedDB: SettingsIndexedDBService) {}

    getLocale(req: HttpRequest<any>): Observable<HttpRequest<any>> {
        return from(this.settingsIndexedDB.get('locale')).pipe(
            take(1),
            switchMap((value: any) => {
            let httpHeaders: HttpHeaders = req.headers ? req.headers : new HttpHeaders();
            const localeCode: string = value ?
            (
                value.match(new RegExp(Pattern.LOCALE, 'g')) ?
                value :
                this.locale
            ) : this.locale;
            httpHeaders = httpHeaders.append('Accept-Language', localeCode);
            return of(req.clone({ headers: httpHeaders }));
        }));
    }

}
