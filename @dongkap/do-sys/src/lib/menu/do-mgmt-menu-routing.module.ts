import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { MgmtMenuComponent } from './do-mgmt-menu.component';
import { MenuPageComponent } from './page/menu-page.component';

const routes: Routes = [{
  path: '',
  component: MgmtMenuComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: MenuPageComponent,
      data: {
        code: '#MANAGEMENT-MENU-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoMgmtMenuRoutingModule {
}
