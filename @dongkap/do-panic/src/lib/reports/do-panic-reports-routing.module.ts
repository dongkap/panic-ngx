import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { DoPanicDetailComponent } from '../details-panic/do-panic-detail.component';
import { DoPanicReportsComponent } from './do-panic-reports.component';
import { DoReportsEmergencyListPageComponent } from './emergency/list/do-reports-emergency-list-page.component';
import { DoReportsFakeListPageComponent } from './fake/list/do-reports-fake-list-page.component';

const routes: Routes = [{
  path: '',
  component: DoPanicReportsComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: 'emergency',
      component: DoReportsEmergencyListPageComponent,
      data: {
        code: '#EMERGENCY-REPORTS-PAGE',
      },
    },
    {
      path: 'emergency/details/:id',
      component: DoPanicDetailComponent,
      data: {
        code: '#EMERGENCY-REPORTS-PAGE',
      },
    },
    {
      path: 'fake',
      component: DoReportsFakeListPageComponent,
      data: {
        code: '#FAKE-REPORTS-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoPanicReportsRoutingModule {
}
