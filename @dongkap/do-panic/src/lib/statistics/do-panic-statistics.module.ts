import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { DoChartsModule, DoBaseModule } from '@dongkap/do-shared';
import { DoThemeModule } from '@dongkap/do-theme';
import { DoPanicStatisticsRoutingModule } from './do-panic-statistics-routing.module';
import { DoPanicStatisticsComponent } from './do-panic-statistics.component';
import { DoPanicStatisticsAreaPageComponent } from './area/do-panic-statistics-area-page.component';
import { DoPanicStatisticsGenderPageComponent } from './gender/do-panic-statistics-gender-page.component';
import { DoPanicStatisticsEmergencyPageComponent } from './emergency/do-panic-statistics-emergency-page.component';
import { DoPanicStatisticsFemalePageComponent } from './gender/female/do-panic-statistics-female-page.component';
import { DoPanicStatisticsMalePageComponent } from './gender/male/do-panic-statistics-male-page.component';

const PANIC_COMPONENTS = [
  DoPanicStatisticsComponent,
  DoPanicStatisticsAreaPageComponent,
  DoPanicStatisticsGenderPageComponent,
  DoPanicStatisticsFemalePageComponent,
  DoPanicStatisticsMalePageComponent,
  DoPanicStatisticsEmergencyPageComponent,
];

const modules = [
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  NbCardModule,
  NbSelectModule,
  DoThemeModule,
  DoBaseModule,
  DoChartsModule,
  DoPanicStatisticsRoutingModule,
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
export class DoPanicStatisticsModule { }
