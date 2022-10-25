import { InjectionToken } from '@angular/core';
import { SecurityResourceModel } from '../../models';

export const OAUTH_INFO: InjectionToken<SecurityResourceModel> =
new InjectionToken<SecurityResourceModel>('OAUTH INFO Resource');
