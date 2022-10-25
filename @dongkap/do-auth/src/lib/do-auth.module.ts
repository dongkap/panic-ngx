import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { DoThemeModule } from '@dongkap/do-theme';
import { DoToastrModule } from '@dongkap/do-shared';
import {
  AUTH_INDEXED_DB,
  PROFILE_INDEXED_DB,
  SETTINGS_INDEXED_DB,
  USER_SERVICE,
} from '@dongkap/do-core';
import { DoLayoutAuthModule } from './do-layout-auth.module';
import { DoAuthRoutingModule } from './do-auth-routing.module';
import { AuthForceService } from './services/auth-force.service';
import { AuthGuardChildService } from './services/auth-guard-child.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthLanguageService } from './services/auth-lang.service';
import { AuthSignatureService } from './services/auth-signature.service';
import { AuthTokenService } from './services/auth-token.service';
import { AuthUserService } from './services/auth-user.service';
import { HttpInterceptorErrorService } from './services/http-interceptor-error.service';
import { HttpInterceptorLangService } from './services/http-interceptor-lang.service';
import { HttpInterceptorSignatureService } from './services/http-interceptor-signature.service';
import { HttpInterceptorTokenService } from './services/http-interceptor-token.service';
import { AuthIndexedDBService } from './services/storage/auth-indexeddb.service';
import { ProfileIndexedDBService } from './services/storage/profile-indexeddb.service';
import { SettingsIndexedDBService } from './services/storage/settings-indexeddb.service';
import { UnauthorizeGuardService } from './services/unauth-guard.service';
import { LoginPageComponent } from './pages/login/login-page.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ForceLoginPageComponent } from './pages/force/force-login-page.component';
import { ForgotPageComponent } from './pages/forgot/forgot-page.component';
import { RequestForgotPageComponent } from './pages/forgot/request-forgot-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { ActivateAccountPageComponent } from './pages/activate-account/activate-account-page.component';
import { OAuth2CallbackComponent } from './pages/oauth2/oauth2-callback.component';

export const AUTH_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorTokenService, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorSignatureService, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorLangService, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorErrorService, multi: true},
  { provide: USER_SERVICE, useClass: AuthUserService },
  { provide: AUTH_INDEXED_DB, useClass: AuthIndexedDBService },
  { provide: PROFILE_INDEXED_DB, useClass: ProfileIndexedDBService },
  { provide: SETTINGS_INDEXED_DB, useClass: SettingsIndexedDBService },
  AuthGuardService,
  UnauthorizeGuardService,
  AuthTokenService,
  AuthGuardChildService,
  AuthSignatureService,
  AuthLanguageService,
  AuthForceService
];

export const AUTH_COMPONENTS = [
  LoginPageComponent,
  LogoutComponent,
  ForceLoginPageComponent,
  ForgotPageComponent,
  RequestForgotPageComponent,
  RegisterPageComponent,
  ActivateAccountPageComponent,
  TermsConditionsComponent,
  OAuth2CallbackComponent,
];

@NgModule({
  declarations: [
    ...AUTH_COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbSpinnerModule,
    NbDialogModule.forChild(),
    DoThemeModule,
    DoToastrModule.forRoot(),
    DoLayoutAuthModule,
    DoAuthRoutingModule,
  ],
  exports: [
    ...AUTH_COMPONENTS,
  ],
})
export class DoAuthModule {
  static forRoot(): ModuleWithProviders<DoAuthModule> {
    return {
      ngModule: DoAuthModule,
      providers: [
        ...AUTH_PROVIDERS,
      ],
    };
  }
}
