import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  IndexedDBFactoryService,
  IndexedDBService,
  oauthInfoModels,
  TypeDataOauth,
} from '@dongkap/do-core';
import { SettingsIDB } from '../../models/settings.schema';

@Injectable({providedIn : 'root'})
export class SettingsIndexedDBService extends IndexedDBService<SettingsIDB> implements IndexedDBFactoryService {

  private translate: TranslateService;

  constructor(injector: Injector) {
    super(injector, 'do-core', 1, '#do-settings');
    this.translate = injector.get(TranslateService);
  }

  public loginStorage(response: any): void {
    oauthInfoModels.forEach(data => {
      if (response[data.key]) {
        if (data.type === TypeDataOauth.SETTINGS && data.persist) {
          this.put(data.key, data.string ? response[data.key] : JSON.stringify(response[data.key])).then();
          if (data.key === 'locale') {
            this.translate.getTranslation(response[data.key]).subscribe((lang: any) => {
              this.translate.use(response[data.key]);
              this.translate.setTranslation(response[data.key], lang, true);
            });
          }
        }
      }
    });
  }

}
