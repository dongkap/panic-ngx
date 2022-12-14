import { RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthTokenService } from './auth-token.service';
import { AuthParam } from '@dongkap/do-core';

@Injectable()
export class UnauthorizeGuardService implements CanActivate {
    constructor(private router: Router, private authTokenService: AuthTokenService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const result$: Subject<boolean> = new Subject<boolean>();
        this.authTokenService.authenticate().subscribe((auth: AuthParam) => {
            result$.next(auth === AuthParam.DENIED);
            if (auth === AuthParam.GRANTED) {
                this.router.navigate(['/app']);
            } else if (auth === AuthParam.LOCKED) {
                this.router.navigate(['/auth/lock']);
            }
        });
        return result$.asObservable();
    }

}
