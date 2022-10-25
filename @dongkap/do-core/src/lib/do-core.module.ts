import {
  ErrorHandler,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HTTP_SERVICE } from './providers/http.provider';
import { STORAGE_SERVICE } from './providers/shared/storage.provider';
import { ErrorHandlerService } from './services/error-handler.service';
import { CustomPreloadingStrategy } from './services/preloading-strategy.service';
import { EncryptionService } from './services/security/encryption.service';
import { StorageMaskService } from './services/storage/storage-mask.service';
import { HttpCommonService } from './services/utils/http-common.service';
import { TranslationService } from './services/utils/translation.service';

export const CORE_PROVIDERS = [
  CustomPreloadingStrategy,
  EncryptionService,
  { provide: HTTP_SERVICE, useClass: HttpCommonService},
  { provide: ErrorHandler, useClass: ErrorHandlerService},
  { provide: STORAGE_SERVICE, useClass: StorageMaskService },
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslationService(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
})
export class DoCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: DoCoreModule) {
    throwIfAlreadyLoaded(parentModule, 'DoCoreModule');
  }

  static forRoot(): ModuleWithProviders<DoCoreModule> {
    return {
      ngModule: DoCoreModule,
      providers: [
        ...CORE_PROVIDERS,
        ...TranslateModule.forRoot({
              loader: {
                  provide: TranslateLoader,
                  useFactory: (createTranslateLoader),
                  deps: [HttpClient],
              },
            }).providers,
      ],
    };
  }
}
