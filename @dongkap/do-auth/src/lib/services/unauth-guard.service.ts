import { RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class UnauthorizeGuardService implements CanActivate {
    constructor(private router: Router, private authTokenService: AuthTokenService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const result$: Subject<boolean> = new Subject<boolean>();
        this.authTokenService.isLogin().then((value: boolean) => {
            result$.next(!value);
            if (value) {
                this.router.navigate(['/app']);
            }
        });
        return result$.asObservable();
    }

}
