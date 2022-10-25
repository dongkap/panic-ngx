import { Injectable } from '@angular/core';
import { oauthInfoModels, TypeDataOauth } from '@dongkap/do-core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({providedIn : 'root'})
export class SettingsLocalStorageService {

  constructor(private translate: TranslateService) {}

  public loginStorage(response: any): void {
    oauthInfoModels.forEach(data => {
      if (response[data.key]) {
        if (data.type === TypeDataOauth.LOCALSTORAGE) {
          if (data.key === 'locale') {
            localStorage.setItem('locale', response[data.key]);
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
