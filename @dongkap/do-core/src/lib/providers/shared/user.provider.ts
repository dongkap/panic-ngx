import { InjectionToken } from '@angular/core';
import { UserService } from '../../services/security/user.service';

export const USER_SERVICE: InjectionToken<UserService> =
new InjectionToken<UserService>('USER Service');
