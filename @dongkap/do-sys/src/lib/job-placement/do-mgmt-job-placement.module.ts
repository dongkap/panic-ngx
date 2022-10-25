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
} from '@dongkap/do-shared';
import { MgmtJobPlacementComponent } from './do-mgmt-job-placement.component';
import { DoMgmtJobPlacementRoutingModule } from './do-mgmt-job-placement-routing.module';
import { JobPlacementService } from './services/job-placement.service';
import { JobPlacementListPageComponent } from './list/job-placement-list-page.component';
import { JobPlacementEditPageComponent } from './edit/job-placement-edit-page.component';
import { EmployeePromptComponent } from './edit/prompt-employee/employee-prompt.component';

const components = [
  MgmtJobPlacementComponent,
  JobPlacementListPageComponent,
  JobPlacementEditPageComponent,
  EmployeePromptComponent,
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
  DoLabelModule,
  DoMgmtJobPlacementRoutingModule,
];

const providers = [
  JobPlacementService,
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
export class DoMgmtJobPlacementModule { }
