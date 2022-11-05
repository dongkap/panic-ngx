import { RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthTokenService } from './auth-token.service';
import { AuthParam, UserService, USER_SERVICE } from '@dongkap/do-core';

@Injectable()
export class UnauthorizeGuardLockService implements CanActivate {
    constructor(
        private router: Router,
        private authTokenService: AuthTokenService,
        @Inject(USER_SERVICE) private authService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const result$: Subject<boolean> = new Subject<boolean>();
        this.authTokenService.authenticate().subscribe((auth: AuthParam) => {
            result$.next(auth === AuthParam.LOCKED);
            if (auth === AuthParam.GRANTED) {
                this.router.navigate(['/app']);
            } else if (auth === AuthParam.DENIED) {
                this.router.navigate(['/auth']);
            }
        });
        return result$.asObservable();
    }

}
