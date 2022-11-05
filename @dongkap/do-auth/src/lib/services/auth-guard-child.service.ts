import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthParam, EncryptionService } from '@dongkap/do-core';
import { AuthTokenService } from './auth-token.service';
import { AuthIndexedDBService } from './storage/auth-indexeddb.service';

@Injectable()
export class AuthGuardChildService implements CanActivateChild {
    constructor(
        private router: Router,
        private authTokenService: AuthTokenService,
        private translate: TranslateService,
        private enc: EncryptionService,
        private storage: AuthIndexedDBService) {}

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const result$: Subject<boolean> = new Subject<boolean>();
        this.authTokenService.authenticate().subscribe((auth: AuthParam) => {
            result$.next(auth === AuthParam.GRANTED);
            if (auth === AuthParam.DENIED) {
                this.router.navigate(['/auth']);
            } else if (auth === AuthParam.LOCKED) {
                this.router.navigate(['/auth/lock']);
            } else {
                if (route.data) {
                    if (route.data['title']) {
                        this.translate.get(route.data['title']).subscribe(trans => {
                            route.data['title'] = trans;
                        });
                    }
                    Promise.all([
                        this.storage.getEnc('menus'),
                        this.storage.getEnc('extras'),
                    ]).then((strg: string[]) => {
                        if (!(strg[0].includes(route.data['code']) || strg[1].includes(route.data['code']))) {
                            this.router.navigate(['/app/home']);
                        }
                        return result$.asObservable();
                    });
                }
            }
        });
        return result$.asObservable();
    }

}
