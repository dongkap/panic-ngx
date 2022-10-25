import { Observable } from 'rxjs';
import { IndexedDBFactoryService } from './indexeddb-factory.service';
import { StoreValue, StoreKey } from 'idb';

export interface IndexedDBEncFactoryService extends IndexedDBFactoryService {
  getEnc(key): Promise<StoreValue<any, any>>;
  putEnc(key, val): Promise<StoreKey<any, any>>;
  removeEnc(key): Promise<void>;

  getOfEnc(key): Observable<any>;
  putOfEnc(key, val): Observable<any>;
  removeOfEnc(key): Observable<void>;
}
