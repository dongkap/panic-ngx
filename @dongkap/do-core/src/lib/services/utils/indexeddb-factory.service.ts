import { Observable } from 'rxjs';
import { StoreValue, StoreKey, IDBPDatabase } from 'idb';

export interface IndexedDBFactoryService {
  openSessionIDB(dbname: string, version: number): Promise<IDBPDatabase<any>>;

  getAllOf(): Observable<any>;
  getOf(key): Observable<any>;
  putOf(key, val): Observable<any>;
  removeOf(key): Observable<void>;

  getAll(): Promise<StoreValue<any, any>[]>;
  get(key): Promise<StoreValue<any, any>>;
  put(key, val): Promise<StoreKey<any, any>>;
  remove(key): Promise<void>;
  clearAll(): Promise<void>;
  keys(): Promise<StoreKey<any, any>[]>;

  getAllVal(storeName: any): Promise<StoreValue<any, any>[]>;
  getKeyVal(storeName: any, key): Promise<StoreValue<any, any>>;
  putKeyVal(storeName: any, key, val): Promise<StoreKey<any, any>>;
  removeKeyVal(storeName: any, key): Promise<void>;
  clearAllKeyVal(storeName: any): Promise<void>;
  keysKeyVal(storeName: any): Promise<StoreKey<any, any>[]>;

  addArticle(storeName: any, value: any): Promise<StoreKey<any, any>>;
  addAllArticle(storeName: any, values: any[]): Promise<void>;
}
