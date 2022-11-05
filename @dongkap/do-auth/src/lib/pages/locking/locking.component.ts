import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from '../../services/auth-token.service';

@Component({
    selector: 'do-locking',
    styleUrls: ['locking.component.scss'],
    templateUrl: 'locking.component.html',
})
export class LockingComponent implements OnInit {

    constructor(private authTokenService: AuthTokenService) {
    }

    ngOnInit(): void {
        this.authTokenService.lockout();
    }
}
