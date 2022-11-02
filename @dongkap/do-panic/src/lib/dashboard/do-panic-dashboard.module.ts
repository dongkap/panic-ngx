import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbDialogModule,
  NbWindowModule,
  NbButtonModule,
  NbAccordionModule,
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
import { DoPanicModule } from '../do-panic.module';
import { DoPanicDashboardRoutingModule } from './do-panic-dashboard-routing.module';
import { DoDashboardComponent } from './do-panic-dashboard.component';
import { DoPanicMonitoringPageComponent } from './monitoring/do-panic-monitoring-page.component';
import { DoPanicSlideOutComponent } from './monitoring/slide-out/do-panic-slide-out.component';
import { DoPanicMonitoringInfoComponent } from './monitoring/info/do-panic-monitoring-info.component';

const PANIC_COMPONENTS = [
  DoDashboardComponent,
  DoPanicMonitoringPageComponent,
  DoPanicMonitoringInfoComponent,
  DoPanicSlideOutComponent,
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
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoSelectModule,
  DoMapsModule,
  DoDatatableModule,
  DoLabelModule,
  DoPanicModule.forRoot(),
  DoPanicDashboardRoutingModule,
];

const PANIC_PROVIDERS = [
];

@NgModule({
  imports: [
    ...modules,
  ],
  declarations: [
    ...PANIC_COMPONENTS,
  ],
  providers: [
    ...PANIC_PROVIDERS,
  ],
})
export class DoPanicDashboardModule { }
