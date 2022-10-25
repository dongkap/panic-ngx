import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'do-auth',
  styleUrls: ['auth.component.scss'],
  templateUrl: 'auth.component.html',
})
export class AuthComponent implements OnDestroy {

    alive: boolean;
    subscription: any;
    authenticated: boolean;
    token: string;

    constructor(private location: Location) {}

    public back(): boolean {
        this.location.back();
        return false;
    }

    ngOnDestroy(): void {
        this.alive = false;
    }

}
