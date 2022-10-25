import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NbButtonModule } from '@nebular/theme';
import { DoWizardComponent } from './do-wizard.component';
import { DoWizardErrorComponent } from './wizard-error/do-wizard-error.component';
import { DoWizardButtonsComponent } from './wizard-buttons/do-wizard-buttons.component';
import { DoWizardNavigationComponent } from './wizard-navigation/do-wizard-navigation.component';
import { DoWizardPageOutletComponent } from './wizard-page-outlet/do-wizard-page-outlet.component';
import { DoWizardService } from './services/do-wizard.service';

export const WIZARD_COMPONENTS = [
  DoWizardComponent,
  DoWizardErrorComponent,
  DoWizardNavigationComponent,
  DoWizardButtonsComponent,
  DoWizardPageOutletComponent,
];

export const WIZARD_PROVIDERS = [
  DoWizardService,
];

@NgModule({
  declarations: [
    ...WIZARD_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NbButtonModule,
  ],
  exports: [
    ...WIZARD_COMPONENTS,
  ],
})
export class DoWizardModule {
  static forRoot(): ModuleWithProviders<DoWizardModule> {
    return {
      ngModule: DoWizardModule,
      providers: [
        ...WIZARD_PROVIDERS,
      ],
    };
  }
}
