/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TranslateService } from '@ngx-translate/core';
import { RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import {
  DoCoreModule,
  OAUTH_INFO, ENVIRONMENT, API,
} from '@dongkap/do-core';
import { DoAuthModule } from '@dongkap/do-auth';
import { DoThemeModule } from '@dongkap/do-theme';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { apiPath } from '../configs/api.config';
import { oauthResource } from '../configs/security.config';
import { IndexedDBDistributionService } from './services/indexeddb-dist.service';
import { DoPanicModule } from '@dongkap/do-panic';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    DoThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    NgIdleKeepaliveModule.forRoot(),
    DoCoreModule.forRoot(),
    DoAuthModule.forRoot(),
    DoPanicModule.forRoot(),
    ServiceWorkerModule.register(environment.basePath + 'ngdo-sw.js'),
    // ServiceWorkerModule.register(environment.basePath + 'ngdo-sw.js', {enabled: environment.production && location.protocol !== 'http:'}),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LOCALE_ID, useValue: environment.locale,
    },
    {
      provide: LocationStrategy, useClass: PathLocationStrategy,
    },
    {
      provide: APP_BASE_HREF, useValue: environment.basePath,
    },
    {
      provide: ENVIRONMENT, useValue: environment,
    },
    {
      provide: API, useValue: apiPath,
    },
    {
      provide: OAUTH_INFO, useValue: oauthResource,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: oauthResource.recaptcha,
      },
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      deps: [ TranslateService ],
      useFactory: (translate: TranslateService) => {
        return translate.currentLang ? translate.currentLang .split('-')[0] : 'en';
      },
    },
    IndexedDBDistributionService,
  ],
})
export class AppModule {}
