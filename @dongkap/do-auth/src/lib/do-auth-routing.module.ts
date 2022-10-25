import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthorizeGuardService } from './services/unauth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthComponent } from './pages/layout/auth.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ForceLoginPageComponent } from './pages/force/force-login-page.component';
import { RequestForgotPageComponent } from './pages/forgot/request-forgot-page.component';
import { ForgotPageComponent } from './pages/forgot/forgot-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { ActivateAccountPageComponent } from './pages/activate-account/activate-account-page.component';
import { OAuth2CallbackComponent } from './pages/oauth2/oauth2-callback.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: '',
      component: LoginPageComponent,
      canActivate: [UnauthorizeGuardService],
    },
    {
      path: 'login',
      component: LoginPageComponent,
      canActivate: [UnauthorizeGuardService],
    },
    {
      path: 'force',
      component: ForceLoginPageComponent,
      canActivate: [UnauthorizeGuardService],
    },
    {
      path: 'register',
      component: RegisterPageComponent,
      canActivate: [UnauthorizeGuardService],
    },
    {
      path: 'forgot-password',
      component: RequestForgotPageComponent,
      canActivate: [UnauthorizeGuardService],
    },
    {
      path: 'forgot-password/:id/:code',
      component: ForgotPageComponent,
      canActivate: [UnauthorizeGuardService],
    },
    {
      path: 'activate/:id/:code',
      component: ActivateAccountPageComponent,
      canActivate: [UnauthorizeGuardService],
    },
    {
      path: 'callback',
      component: OAuth2CallbackComponent,
      canActivate: [UnauthorizeGuardService],
    },
    {
      path: 'logout',
      component: LogoutComponent,
      canActivate: [AuthGuardService],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoAuthRoutingModule {
}
