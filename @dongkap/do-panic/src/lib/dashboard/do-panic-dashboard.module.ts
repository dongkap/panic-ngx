import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbDialogModule,
  NbWindowModule,
  NbButtonModule,
} from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { DoThemeModule } from '@dongkap/do-theme';
import {
  DoBaseModule,
  DoButtonModule,
  DoCheckBoxModule,
  DoDatatableModule,
  DoInputModule,
  DoLabelModule,
  DoMapsModule,
  DoSelectModule,
} from '@dongkap/do-shared';
import { DoPanicDashboardRoutingModule } from './do-panic-dashboard-routing.module';
import { DoDashboardComponent } from './do-panic-dashboard.component';
import { DoPanicMonitoringPageComponent } from './monitoring/do-panic-monitoring-page.component';
import { DoPanicMonitoringDetailComponent } from './monitoring/detail/do-panic-monitoring-detail.component';
import { DoPanicSlideOutComponent } from './monitoring/slide-out/do-panic-slide-out.component';
import { DoPanicMonitoringInfoComponent } from './monitoring/info/do-panic-monitoring-info.component';
import { DoPanicDatatableComponent } from './monitoring/detail/datatable/do-panic-datatable.component';
import { DoPanicMonitoringPreviewComponent } from './monitoring/preview/do-panic-monitoring-preview.component';
import { DoFakeReportPromptComponent } from './monitoring/detail/prompt/do-fake-report-prompt.component';

const PANIC_COMPONENTS = [
  DoDashboardComponent,
  DoPanicMonitoringPageComponent,
  DoPanicMonitoringInfoComponent,
  DoPanicSlideOutComponent,
  DoPanicDatatableComponent,
  DoPanicMonitoringDetailComponent,
  DoPanicMonitoringPreviewComponent,
  DoFakeReportPromptComponent,
];

const modules = [
  FormsModule,
  ReactiveFormsModule,
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbButtonModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  TranslateModule,
  NgxDatatableModule,
  DoThemeModule,
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoSelectModule,
  DoMapsModule,
  DoDatatableModule,
  DoLabelModule,
  DoPanicDashboardRoutingModule,
];

const providers = [
];

@NgModule({
  imports: [
    ...modules,
  ],
  declarations: [
    ...PANIC_COMPONENTS,
  ],
  providers: [
    ...providers,
  ],
})
export class DoPanicDashboardModule { }
