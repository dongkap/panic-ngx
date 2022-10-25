import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { ExtraComponent } from './do-extra.component';
import { SecurityPageComponent } from './security/security-page.component';
import { SettingsPageComponent } from './settings/settings-page.component';
import { ProfilePageComponent } from './profile/profile-page.component';
import { TermsConditionsPageComponent } from './terms/terms-conditions-page.component';
import { PrivacyPolicyPageComponent } from './privacy-policy/privacy-policy-page.component';

const routes: Routes = [{
  path: '',
  component: ExtraComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: 'profile',
      component: ProfilePageComponent,
      data: {
        code: '#PROFILE-PAGE',
        title: 'Profile',
      },
    },
    {
      path: 'security',
      component: SecurityPageComponent,
      data: {
        code: '#SECURITY-PAGE',
      },
    },
    {
      path: 'settings',
      component: SettingsPageComponent,
      data: {
        code: '#SETTINGS-PAGE',
      },
    },
    {
      path: 'terms',
      component: TermsConditionsPageComponent,
      data: {
        code: '#SETTINGS-PAGE',
      },
    },
    {
      path: 'privacy-policy',
      component: PrivacyPolicyPageComponent,
      data: {
        code: '#SETTINGS-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoExtraRoutingModule {
}
