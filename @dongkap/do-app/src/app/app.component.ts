/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NbThemeService } from '@nebular/theme';
import { Pattern } from '@dongkap/do-core';
import { AnalyticsService, SeoService } from '@dongkap/do-theme';
import { SettingsIndexedDBService } from '@dongkap/do-auth';
import { IndexedDBDistributionService } from './services/indexeddb-dist.service';

@Component({
  selector: 'do-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    public indexedDBDistribution: IndexedDBDistributionService,
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private translate: TranslateService,
    private themeService: NbThemeService,
    private settingsIndexedDB: SettingsIndexedDBService,
    @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.defaultTheme();
    let localeCode: string = this.locale;
    this.settingsIndexedDB.get('locale').then((loc: string) => {
        if (loc) {
          if (loc.match(new RegExp(Pattern.LOCALE, 'g'))) {
            localeCode = loc;
          } else {
            this.settingsIndexedDB.put('locale', localeCode).then();
          }
        } else {
          this.settingsIndexedDB.put('locale', localeCode).then();
        }
        this.translate.addLangs(['en-US', 'id-ID']);
        this.translate.setDefaultLang(localeCode);
        this.translate.use(localeCode);
        this.locale = this.translate.currentLang;
    });
  }

  defaultTheme() {
    this.settingsIndexedDB.get('theme').then((theme: any) => {
      if (theme) {
        if (theme.match(new RegExp('^default$|^dark$|^cosmic$|^corporate$', 'g'))) {
          this.themeService.changeTheme(theme);
        }
      }
    });
  }
}
