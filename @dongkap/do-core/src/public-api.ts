/*
 * Public API Surface of do-core
 */

export * from './lib/do-core.module';

export * from './lib/models';

export { TranslationService } from './lib/services/utils/translation.service';
export { CustomPreloadingStrategy } from './lib/services/preloading-strategy.service';
export { ErrorHandlerService } from './lib/services/error-handler.service';

export { UserService } from './lib/services/security/user.service';
export { EncryptionService } from './lib/services/security/encryption.service';

export { IndexedDBService } from './lib/services/storage/indexed-db.service';
export { StorageFactoryService } from './lib/services/storage/storage-factory.service';

export { HttpCommonService } from './lib/services/utils/http-common.service';
export { HttpFactoryService } from './lib/services/utils/http-factory.service';
export { IndexedDBFactoryService } from './lib/services/utils/indexeddb-factory.service';
export { IndexedDBEncFactoryService } from './lib/services/utils/indexeddb-enc-factory.service';

export { HTTP_SERVICE } from './lib/providers/http.provider';
export { OAUTH_INFO } from './lib/providers/shared/oauth.provider';
export { USER_SERVICE } from './lib/providers/shared/user.provider';
export { API } from './lib/providers/shared/api.provider';
export { ENVIRONMENT } from './lib/providers/shared/environment.provider';
export {
    STORAGE_SERVICE,
    AUTH_INDEXED_DB,
    PROFILE_INDEXED_DB,
    SETTINGS_INDEXED_DB,
    PANIC_INDEXED_DB,
} from './lib/providers/shared/storage.provider';

export { CustomRouteReuseStrategy } from './lib/route-strategy/custom-route-reuse-strategy';
