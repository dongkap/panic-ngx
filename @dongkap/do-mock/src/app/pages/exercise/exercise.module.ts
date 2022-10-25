import { LOCALE_ID, NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NbButtonModule } from '@nebular/theme';
import { API, ENVIRONMENT, HttpCommonService, HTTP_SERVICE, OAUTH_INFO } from '@dongkap/do-core';
import {
  DoBaseModule,
  DoButtonModule,
  DoCheckBoxModule,
  DoDatatableModule,
  DoEditorModule,
  DoInputModule,
  DoSelectModule,
  DoDatePickerModule,
  DoRadioModule,
  DoWizardModule
} from '@dongkap/do-shared';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseComponent } from './exercise.component';
import { ExercisePageComponent } from './exercise-page.component';
import { ExerciseInputTextComponent } from './input-text/exercise-input-text.component';
import { ExerciseInputCurrencyComponent } from './input-currency/exercise-input-currency.component';
import { ExerciseInputFileComponent } from './input-file/exercise-input-file.component';
import { ExerciseSelectBoxComponent } from './select-box/exercise-select-box.component';
import { ExerciseDatatableComponent } from './datatable/exercise-datatable.component';
import { ExerciseCheckboxComponent } from './checkbox/exercise-checkbox.component';
import { ExerciseDatePickerComponent } from './datepicker/exercise-datepicker.component';
import { ExerciseEditorComponent } from './editor/exercise-editor.component';
import { ExerciseRadioComponent } from './radio/exercise-radio.component';
import { ExerciseWizardComponent } from './wizard/exercise-wizard.component';
import { ExerciseWizardStep1Component } from './wizard/step1/exercise-wizard-step1.component';
import { ExerciseWizardStep2Component } from './wizard/step2/exercise-wizard-step2.component';
import { ExerciseWizardStep3Component } from './wizard/step3/exercise-wizard-step3.component';
import { environment } from '../../../environments/environment';
import { apiPath } from '../../../configs/api.config';
import { oauthResource } from '../../../configs/security.config';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    DoWizardModule.forRoot(),
    ExerciseRoutingModule,
    NbButtonModule,
    DoBaseModule,
    DoButtonModule,
    DoDatatableModule,
    DoInputModule,
    DoSelectModule,
    DoCheckBoxModule,
    DoDatePickerModule,
    DoEditorModule,
    DoRadioModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient],
      },
    }),
  ],
  declarations: [
    ExerciseComponent,
    ExercisePageComponent,
    ExerciseInputTextComponent,
    ExerciseInputCurrencyComponent,
    ExerciseInputFileComponent,
    ExerciseSelectBoxComponent,
    ExerciseDatatableComponent,
    ExerciseCheckboxComponent,
    ExerciseDatePickerComponent,
    ExerciseEditorComponent,
    ExerciseRadioComponent,
    ExerciseWizardComponent,
    ExerciseWizardStep1Component,
    ExerciseWizardStep2Component,
    ExerciseWizardStep3Component,
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: environment.locale,
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
      provide: HTTP_SERVICE,
      useClass: HttpCommonService,
    },
  ],
})
export class ExerciseModule { }
