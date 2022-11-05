import { RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthParam, UserService, USER_SERVICE } from '@dongkap/do-core';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private authTokenService: AuthTokenService,
        @Inject(USER_SERVICE) private authService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const result$: Subject<boolean> = new Subject<boolean>();
        this.authTokenService.authenticate().subscribe((auth: AuthParam) => {
            result$.next(auth === AuthParam.GRANTED);
            if (auth === AuthParam.DENIED) {
                this.router.navigate(['/auth']);
            } else if (auth === AuthParam.LOCKED) {
                this.router.navigate(['/auth/lock']);
            } else {
                if (!state.url.match('/auth/logout') && !state.url.match('/auth/locking')) {
                    this.authService.loadUser();
                }
            }
        });
        return result$.asObservable();
    }

}
