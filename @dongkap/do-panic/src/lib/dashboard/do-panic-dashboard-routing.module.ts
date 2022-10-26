import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { DoDashboardComponent } from './do-panic-dashboard.component';
import { DoPanicMonitoringPageComponent } from './monitoring/do-panic-monitoring-page.component';
import { DoPanicMonitoringDetailComponent } from './monitoring/detail/do-panic-monitoring-detail.component';

const routes: Routes = [{
  path: '',
  component: DoDashboardComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: DoPanicMonitoringPageComponent,
      data: {
        code: '#MONITORING-PAGE',
      },
    },
    {
      path: 'details/:code',
      component: DoPanicMonitoringDetailComponent,
      data: {
        code: '#MONITORING-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoPanicDashboardRoutingModule {
}
