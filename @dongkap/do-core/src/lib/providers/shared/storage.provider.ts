import { InjectionToken } from '@angular/core';
import { StorageFactoryService } from '../../services/storage/storage-factory.service';
import { IndexedDBEncFactoryService } from '../../services/utils/indexeddb-enc-factory.service';
import { IndexedDBFactoryService } from '../../services/utils/indexeddb-factory.service';

export const STORAGE_SERVICE: InjectionToken<StorageFactoryService> =
new InjectionToken<StorageFactoryService>('Storage Factory Service');

export const AUTH_INDEXED_DB: InjectionToken<IndexedDBEncFactoryService> =
new InjectionToken<IndexedDBEncFactoryService>('Auth IndexedDB Resource');

export const PROFILE_INDEXED_DB: InjectionToken<IndexedDBFactoryService> =
new InjectionToken<IndexedDBFactoryService>('Profile IndexedDB Resource');

export const SETTINGS_INDEXED_DB: InjectionToken<IndexedDBFactoryService> =
new InjectionToken<IndexedDBFactoryService>('Settings IndexedDB Resource');

export const PANIC_INDEXED_DB: InjectionToken<IndexedDBFactoryService> =
new InjectionToken<IndexedDBFactoryService>('Panic IndexedDB Resource');
