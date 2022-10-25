import { Injectable } from '@angular/core';
import { IDBPDatabase, IDBPTransaction } from 'idb';
import * as idb from 'idb';

@Injectable()
export class IndexedDBDistributionService {

  constructor() {
    this.createIDBStore();
  }

  public async createIDBStore(): Promise<any> {
    await idb.openDB<any>('do-core', 1, {
      async upgrade(database: IDBPDatabase<any>) {
        database.createObjectStore('#do-auth');
        database.createObjectStore('#do-profile');
        database.createObjectStore('#do-settings');
      },
    });
    await idb.openDB<any>('do-emergency', 1, {
      async upgrade(db: IDBPDatabase<any>) {
        db.createObjectStore('#do-panic');
      },
    });
  }

}
