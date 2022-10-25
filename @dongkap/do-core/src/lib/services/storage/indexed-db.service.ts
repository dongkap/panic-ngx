import { Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IDBPDatabase, StoreValue, StoreKey } from 'idb';
import * as idb from 'idb';
import { SecurityResourceModel } from '../../models';
import { OAUTH_INFO } from '../../providers/shared/oauth.provider';
import { EncryptionService } from '../security/encryption.service';

export class IndexedDBService<T> {
  protected $dbPromise: Promise<IDBPDatabase<T>>;
  protected enc: EncryptionService;
  protected oauthResource: SecurityResourceModel;

  constructor(injector: Injector, dbname: string, version: number, private storeName: any) {
    this.openSessionIDB(dbname, version);
    this.enc = injector.get(EncryptionService);
    this.oauthResource = injector.get(OAUTH_INFO);
  }

  public async openSessionIDB(dbname: string, version: number): Promise<IDBPDatabase<T>> {
    return this.$dbPromise = idb.openDB<T>(dbname, version);
  }

  public getAllOf(): Observable<any> {
    const result$: Subject<any> = new Subject<any>();
    this.getAllVal(this.storeName).then((value: any) => {
      result$.next(value);
    });
    return result$.asObservable();
  }
  public getOf(key): Observable<any> {
    const result$: Subject<any> = new Subject<any>();
    this.getKeyVal(key, this.storeName).then((value: any) => {
      result$.next(value);
    });
    return result$.asObservable();
  }
  public putOf(key, val): Observable<any> {
    const result$: Subject<any> = new Subject<any>();
    this.putKeyVal(key, val, this.storeName).then((value: any) => {
      result$.next(value);
    });
    return result$.asObservable();
  }
  public removeOf(key): Observable<void> {
    const result$: Subject<any> = new Subject<any>();
    this.removeKeyVal(key, this.storeName).then((value: any) => {
      result$.next(value);
    });
    return result$.asObservable();
  }

  public getAll(): Promise<StoreValue<T, any>[]> {
    return this.getAllVal(this.storeName);
  }
  public get(key): Promise<StoreValue<T, any>> {
    return this.getKeyVal(this.storeName, key);
  }
  public put(key, val): Promise<StoreKey<T, any>> {
    return this.putKeyVal(this.storeName, key, val);
  }
  public remove(key): Promise<void> {
    return this.removeKeyVal(this.storeName, key);
  }
  public clearAll(): Promise<void> {
    return this.clearAllKeyVal(this.storeName);
  }
  public keys(): Promise<StoreKey<T, any>[]> {
    return this.keysKeyVal(this.storeName);
  }

  public async getAllVal(storeName: any): Promise<StoreValue<T, any>[]> {
    return (await this.$dbPromise).getAll(storeName);
  }
  public async getKeyVal(storeName: any, key): Promise<StoreValue<T, any>> {
    return (await this.$dbPromise).get(storeName, key);
  }
  public async putKeyVal(storeName: any, key, val): Promise<StoreKey<T, any>> {
    return (await this.$dbPromise).put(storeName, val, key);
  }
  public async removeKeyVal(storeName: any, key): Promise<void> {
    return (await this.$dbPromise).delete(storeName, key);
  }
  public async clearAllKeyVal(storeName: any): Promise<void> {
    return (await this.$dbPromise).clear(storeName);
  }
  public async keysKeyVal(storeName: any): Promise<StoreKey<T, any>[]> {
    return (await this.$dbPromise).getAllKeys(storeName);
  }

  public async addArticle(storeName: any, value: any): Promise<StoreKey<T, any>> {
      return (await this.$dbPromise).add(storeName, value);
  }
  public async addAllArticle(storeName: any, values: any[]): Promise<void> {
      const tx = (await this.$dbPromise).transaction(storeName, 'readwrite');
      values.forEach((value: any) => {
          tx.store.add(value);
      });
      return await tx.done;
  }
}
