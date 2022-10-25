import { InjectionToken } from '@angular/core';
import { Environment } from '../../models';

export const ENVIRONMENT: InjectionToken<Environment> =
new InjectionToken<Environment>('Environment Config');
