import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { DoPanicStatisticsComponent } from './do-panic-statistics.component';
import { DoPanicStatisticsAreaPageComponent } from './area/do-panic-statistics-area-page.component';
import { DoPanicStatisticsGenderPageComponent } from './gender/do-panic-statistics-gender-page.component';
import { DoPanicStatisticsEmergencyPageComponent } from './emergency/do-panic-statistics-emergency-page.component';

const routes: Routes = [{
  path: '',
  component: DoPanicStatisticsComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: 'area',
      component: DoPanicStatisticsAreaPageComponent,
      data: {
        code: '#STATISTICS-AREA-PAGE',
      },
    },
    {
      path: 'gender',
      component: DoPanicStatisticsGenderPageComponent,
      data: {
        code: '#STATISTICS-GENDER-PAGE',
      },
    },
    {
      path: 'emergency',
      component: DoPanicStatisticsEmergencyPageComponent,
      data: {
        code: '#STATISTICS-EMERGENCY-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoPanicStatisticsRoutingModule {
}
