import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { MgmtBusinessPartnerComponent } from './do-mgmt-business-partner.component';
import { BusinessPartnerListPageComponent } from './list/business-partner-list-page.component';
import { BusinessPartnerAddEditPageComponent } from './add-edit/business-partner-add-edit-page.component';

const routes: Routes = [{
  path: '',
  component: MgmtBusinessPartnerComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: BusinessPartnerListPageComponent,
      data: {
        code: '#MANAGEMENT-BP-PAGE',
      },
    },
    {
      path: ':action',
      component: BusinessPartnerAddEditPageComponent,
      data: {
        code: '#MANAGEMENT-BP-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoMgmtBusinessPartnerRoutingModule {
}
