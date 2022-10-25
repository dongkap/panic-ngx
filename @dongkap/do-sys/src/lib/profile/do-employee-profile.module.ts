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
  DoLabelModule,
  DoEditorModule,
  DoDatePickerModule,
  DoImageModule,
} from '@dongkap/do-shared';
import { EmployeeProfileComponent } from './do-employee-profile.component';
import { DoEmployeeProfileRoutingModule } from './do-employee-profile-routing.module';
import { EmployeeProfilePageComponent } from './page/employee-profile-page.component';
import { EmployeeProfilePersonalInformationComponent } from './page/personal-information/employee-profile-personal-information.component';
import { EmployeeProfileEducationComponent } from './page/education/employee-profile-education.component';
import { EmployeeProfileEmployeeStatusComponent } from './page/employee-status/employee-profile-employee-status.component';
import { EmployeeProfileEducationFormalPromptComponent } from './page/education/prompt-formal/profile-education-formal-prompt.component';
import { EmployeeProfileEducationNonFormalPromptComponent } from './page/education/prompt-nonformal/profile-education-nonformal-prompt.component';

const components = [
  EmployeeProfileComponent,
  EmployeeProfilePageComponent,
  EmployeeProfilePersonalInformationComponent,
  EmployeeProfileEducationComponent,
  EmployeeProfileEmployeeStatusComponent,
  EmployeeProfileEducationFormalPromptComponent,
  EmployeeProfileEducationNonFormalPromptComponent,
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
  DoLabelModule,
  DoDatePickerModule,
  DoImageModule,
  DoEmployeeProfileRoutingModule,
];

const providers = [
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
export class DoEmployeeProfileModule { }
