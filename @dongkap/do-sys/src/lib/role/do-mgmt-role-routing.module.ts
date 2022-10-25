import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { MgmtRoleComponent } from './do-mgmt-role.component';
import { RoleListPageComponent } from './list/role-list-page.component';
import { RoleAddEditPageComponent } from './add-edit/role-add-edit-page.component';

const routes: Routes = [{
  path: '',
  component: MgmtRoleComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: RoleListPageComponent,
      data: {
        code: '#MANAGEMENT-ROLE-PAGE',
      },
    },
    {
      path: ':action',
      component: RoleAddEditPageComponent,
      data: {
        code: '#MANAGEMENT-ROLE-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoMgmtRoleRoutingModule {
}
