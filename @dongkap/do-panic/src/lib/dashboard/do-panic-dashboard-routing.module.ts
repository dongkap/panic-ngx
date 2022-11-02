import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { DoPanicDetailComponent } from '../details-panic/do-panic-detail.component';
import { DoDashboardComponent } from './do-panic-dashboard.component';
import { DoPanicMonitoringPageComponent } from './monitoring/do-panic-monitoring-page.component';

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
      path: 'details/:id',
      component: DoPanicDetailComponent,
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
