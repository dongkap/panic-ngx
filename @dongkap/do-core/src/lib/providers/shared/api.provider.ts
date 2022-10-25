import { InjectionToken } from '@angular/core';
import { APIModel } from '../../models';

export const API: InjectionToken<APIModel> =
new InjectionToken<APIModel>('API');
