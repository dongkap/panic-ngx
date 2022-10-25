import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbDialogModule, NbAlertModule, NbIconModule, NbButtonModule, NbAccordionModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { DoThemeModule } from '@dongkap/do-theme';
import {
  DoInputModule,
  DoButtonModule,
  DoBaseModule,
  DoCheckBoxModule,
  DoEditorModule,
  DoSelectModule,
  DoDatePickerModule,
  DoImageModule,
} from '@dongkap/do-shared';
import { ChangePasswordPageComponent } from './password/change-password-page.component';
import { ExtraComponent } from './do-extra.component';
import { DoExtraRoutingModule } from './do-extra-routing.module';
import { SecurityPageComponent } from './security/security-page.component';
import { DeactivatedPromptComponent } from './security/prompt/deactivated-prompt.component';
import { SettingsPageComponent } from './settings/settings-page.component';
import { ProfilePageComponent } from './profile/profile-page.component';
import { HomePageComponent } from './home/home-page.component';
import { TermsConditionsPageComponent } from './terms/terms-conditions-page.component';
import { PrivacyPolicyPageComponent } from './privacy-policy/privacy-policy-page.component';
import { DeactivatedProviderPromptComponent } from './security/prompt/deactivated-provider-prompt.component';
import { SwitchRolePageComponent } from './switch-role/switch-role-page.component';

const EXTRA_COMPONENTS = [
  ExtraComponent,
  ChangePasswordPageComponent,
  DeactivatedPromptComponent,
  DeactivatedProviderPromptComponent,
  SecurityPageComponent,
  SettingsPageComponent,
  ProfilePageComponent,
  HomePageComponent,
  TermsConditionsPageComponent,
  PrivacyPolicyPageComponent,
  SwitchRolePageComponent,
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NbCardModule,
    NbAlertModule,
    NbIconModule,
    NbButtonModule,
    NbAccordionModule,
    NbDialogModule.forChild(),
    DoThemeModule,
    DoInputModule,
    DoCheckBoxModule,
    DoButtonModule,
    DoBaseModule,
    DoEditorModule,
    DoSelectModule,
    DoDatePickerModule,
    DoImageModule,
    DoExtraRoutingModule,
  ],
  declarations: [
    ...EXTRA_COMPONENTS,
  ],
})
export class DoExtraModule { }
