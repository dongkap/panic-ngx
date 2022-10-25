import { Injectable, Injector } from '@angular/core';
import {
  additionalInfoModels,
  IndexedDBFactoryService,
  IndexedDBService,
  oauthInfoModels,
  TypeDataOauth,
} from '@dongkap/do-core';
import { ProfileIDB } from '../../models/profile.schema';

@Injectable({providedIn : 'root'})
export class ProfileIndexedDBService extends IndexedDBService<ProfileIDB> implements IndexedDBFactoryService {

  constructor(injector: Injector) {
    super(injector, 'do-core', 1, '#do-profile');
  }

  public loginStorage(response: any): void {
    oauthInfoModels.forEach(data => {
        if (response[data.key]) {
          if (data.type === TypeDataOauth.PROFILE && data.persist) {
            this.put(data.key, data.string ? response[data.key] : JSON.stringify(response[data.key])).then();
          }
        }
    });
  }

  public logout(): void {
    oauthInfoModels.forEach(data => {
      if (data.type === TypeDataOauth.PROFILE) {
        this.remove(data.key);
      }
    });
    additionalInfoModels.forEach(data => {
      if (data.type === TypeDataOauth.PROFILE) {
        this.remove(data.key);
      }
    });
  }

}
