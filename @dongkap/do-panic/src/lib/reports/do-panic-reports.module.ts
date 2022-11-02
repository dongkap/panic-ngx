import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { NbCardModule, NbAlertModule, NbIconModule, NbDialogModule, NbWindowModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { DoThemeModule } from '@dongkap/do-theme';
import { 
  DoBaseModule,
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoSelectModule,
  DoDatatableModule,
  DoLabelModule,
} from '@dongkap/do-shared';
import { DoPanicModule } from '../do-panic.module';
import { DoPanicReportsComponent } from './do-panic-reports.component';
import { DoPanicReportsRoutingModule } from './do-panic-reports-routing.module';

import { DoReportsEmergencyListPageComponent } from './emergency/list/do-reports-emergency-list-page.component';
import { DoReportsFakeListPageComponent } from './fake/list/do-reports-fake-list-page.component';
import { ExportEmergencyComponent } from './emergency/export/export-emergency.component';

const components = [
  DoPanicReportsComponent,
  DoReportsEmergencyListPageComponent,
  DoReportsFakeListPageComponent,
  ExportEmergencyComponent,
];

const modules = [
  FormsModule,
  ReactiveFormsModule,
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbButtonModule,
  NbAccordionModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  TranslateModule,
  NgxDatatableModule,
  DoThemeModule,
  DoBaseModule,
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoSelectModule,
  DoDatatableModule,
  DoLabelModule,
  DoPanicModule.forRoot(),
  DoPanicReportsRoutingModule,
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
export class DoPanicReportsModule { }
