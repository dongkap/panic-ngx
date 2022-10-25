import { Component } from '@angular/core';
import { AuthTokenService } from '../../services/auth-token.service';

@Component({
    selector: 'do-logout',
    styleUrls: ['logout.component.scss'],
    templateUrl: 'logout.component.html',
})
export class LogoutComponent {

    constructor(private authTokenService: AuthTokenService) {
        this.authTokenService.logout();
    }
}
