import { Injectable, Injector } from '@angular/core';
import { IndexedDBFactoryService, IndexedDBService } from '@dongkap/do-core';
import { PanicIDB } from '../models/panic.schema';

@Injectable({providedIn : 'root'})
export class PanicIndexedDBService extends IndexedDBService<PanicIDB> implements IndexedDBFactoryService {

  constructor(injector: Injector) {
    super(injector, 'do-emergency', 1, '#do-panic');
  }

}
