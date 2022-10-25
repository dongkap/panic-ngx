import { Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StoreKey } from 'idb';
import {
  additionalInfoModels,
  IndexedDBEncFactoryService,
  IndexedDBService,
  oauthInfo,
  oauthInfoModels,
  TypeDataOauth,
} from '@dongkap/do-core';
import { AuthIDB } from '../../models/auth.schema';

@Injectable({providedIn : 'root'})
export class AuthIndexedDBService extends IndexedDBService<AuthIDB> implements IndexedDBEncFactoryService {

  constructor(injector: Injector) {
      super(injector, 'do-core', 1, '#do-auth');
  }

  public async getEnc(key, storeName?: any): Promise<AuthIDB['#do-auth']['value']> {
    const keyEncrypted = this.enc.getHmacSha256(this.oauthResource['private_key'], key, true);
    return ((await this.$dbPromise).get(storeName ? storeName : '#do-auth', keyEncrypted)).then((value: any) => {
      return this.enc.decryptAES(this.oauthResource['aes_key'], value);
    });
  }
  public async putEnc(key, val, storeName?: any): Promise<StoreKey<AuthIDB, any>> {
    const keyEncrypted = this.enc.getHmacSha256(this.oauthResource['private_key'], key, true);
    const valueEncrypted = this.enc.encryptAES(this.oauthResource['aes_key'], val);
    return (await this.$dbPromise).put(storeName ? storeName : '#do-auth', valueEncrypted, keyEncrypted);
  }
  public async removeEnc(key, storeName?: any): Promise<void> {
    const keyEncrypted = this.enc.getHmacSha256(this.oauthResource['private_key'], key, true);
    return (await this.$dbPromise).delete(storeName ? storeName : '#do-auth', keyEncrypted);
  }

  public getOfEnc(key, storeName?: any): Observable<any> {
    const result$: Subject<any> = new Subject<any>();
    this.getEnc(key, storeName).then((value: any) => {
      result$.next(value);
    });
    return result$.asObservable();
  }
  public putOfEnc(key, val, storeName?: any): Observable<any> {
    const result$: Subject<any> = new Subject<any>();
    this.putEnc(key, val, storeName).then((value: any) => {
      result$.next(value);
    });
    return result$.asObservable();
  }
  public removeOfEnc(key, storeName?: any): Observable<void> {
    const result$: Subject<any> = new Subject<any>();
    this.removeEnc(key, storeName).then((value: any) => {
      result$.next(value);
    });
    return result$.asObservable();
  }

  public loginStorage(response: any): void {
    oauthInfoModels.forEach(data => {
      if (response[data.key]) {
        if (data.type === TypeDataOauth.OAUTH && data.persist) {
          if (data.enc) {
            this.putEnc(data.key, data.string ? response[data.key] : JSON.stringify(response[data.key])).then();
          } else {
            this.put(data.key, data.string ? response[data.key] : JSON.stringify(response[data.key])).then();
          }
        }
      }
    });
  }

  public logout(): void {
    oauthInfoModels.forEach(data => {
      if (data.enc) {
        if (data.type === TypeDataOauth.OAUTH) {
          this.removeEnc(data.key).then();
        }
      }
    });
    additionalInfoModels.forEach(data => {
      if (data.enc) {
        if (data.type === TypeDataOauth.OAUTH) {
          this.removeEnc(data.key).then();
        }
      }
    });
  }

  public async isLogin(): Promise<boolean> {
      if (await this.getEnc(oauthInfo.access_token)) {
        return true;
      }
      oauthInfoModels.forEach(data => {
        this.removeEnc(data.key).then();
      });
      return false;
  }

}
