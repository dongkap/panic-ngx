import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbDialogModule,
  NbButtonModule,
  NbTabsetModule,
  NbSpinnerModule,
  NbAccordionModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { DoThemeModule } from '@dongkap/do-theme';
import {
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoSelectModule,
  DoDatatableModule,
  DoEditorModule,
  DoWizardModule,
  DoDatePickerModule,
  DoRadioModule,
  DoLabelModule,
} from '@dongkap/do-shared';
import { MgmtEmployeeComponent } from './do-mgmt-employee.component';
import { DoMgmtEmployeeRoutingModule } from './do-mgmt-employee-routing.module';
import { EmployeeService } from './services/employee.service';
import { EmployeeListPageComponent } from './list/employee-list-page.component';
import { EmployeeAddPageComponent } from './add/employee-add-page.component';
import { EmployeeAddPersonalInformationComponent } from './add/personal-information/employee-add-personal-information.component';
import { EmployeeAddEducationComponent } from './add/education/employee-add-education.component';
import { EmployeeAddEmployeeStatusComponent } from './add/employee-status/employee-add-employee-status.component';
import { EmployeeEditPageComponent } from './edit/employee-edit-page.component';
import { EmployeeEditPersonalInformationComponent } from './edit/personal-information/employee-edit-personal-information.component';
import { EmployeeEditEducationComponent } from './edit/education/employee-edit-education.component';
import { EmployeeEditEmployeeStatusComponent } from './edit/employee-status/employee-edit-employee-status.component';
import { EmployeeEducationFormalPromptComponent } from './edit/education/prompt-formal/education-formal-prompt.component';
import { EmployeeEducationNonFormalPromptComponent } from './edit/education/prompt-nonformal/education-nonformal-prompt.component';

const components = [
  MgmtEmployeeComponent,
  EmployeeListPageComponent,
  EmployeeAddPageComponent,
  EmployeeAddPersonalInformationComponent,
  EmployeeAddEducationComponent,
  EmployeeAddEmployeeStatusComponent,
  EmployeeEditPageComponent,
  EmployeeEditPersonalInformationComponent,
  EmployeeEditEducationComponent,
  EmployeeEditEmployeeStatusComponent,
  EmployeeEducationFormalPromptComponent,
  EmployeeEducationNonFormalPromptComponent,
];

const modules = [
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbButtonModule,
  NbAccordionModule,
  NbDialogModule.forChild(),
  NbTabsetModule,
  NbSpinnerModule,
  DoThemeModule,
  DoBaseModule,
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoSelectModule,
  DoDatatableModule,
  DoEditorModule,
  DoDatePickerModule,
  DoRadioModule,
  DoLabelModule,
  DoWizardModule.forRoot(),
  DoMgmtEmployeeRoutingModule,
];

const providers = [
  EmployeeService,
];

@NgModule({
  imports: [
    ...modules,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ...providers,
  ],
})
export class DoMgmtEmployeeModule { }
