import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { MgmtCorporateComponent } from './do-mgmt-corporate.component';
import { CorporateListPageComponent } from './list/corporate-list-page.component';
import { CorporateAddEditPageComponent } from './add-edit/corporate-add-edit-page.component';

const routes: Routes = [{
  path: '',
  component: MgmtCorporateComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: CorporateListPageComponent,
      data: {
        code: '#MANAGEMENT-CORPORATE-PAGE',
      },
    },
    {
      path: ':action',
      component: CorporateAddEditPageComponent,
      data: {
        code: '#MANAGEMENT-CORPORATE-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoMgmtCorporateRoutingModule {
}
