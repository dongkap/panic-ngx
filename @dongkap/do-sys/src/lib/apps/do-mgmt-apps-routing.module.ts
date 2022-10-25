import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { MgmtAppsComponent } from './do-mgmt-apps.component';
import { AppsListPageComponent } from './list/apps-list-page.component';
import { AppsAddEditPageComponent } from './add-edit/apps-add-edit-page.component';

const routes: Routes = [{
  path: '',
  component: MgmtAppsComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: AppsListPageComponent,
      data: {
        code: '#MANAGEMENT-APPS-PAGE',
      },
    },
    {
      path: ':action',
      component: AppsAddEditPageComponent,
      data: {
        code: '#MANAGEMENT-APPS-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoMgmtAppsRoutingModule {
}
