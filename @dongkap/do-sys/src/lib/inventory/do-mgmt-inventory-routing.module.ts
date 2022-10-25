import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { MgmtInventoryComponent } from './do-mgmt-inventory.component';
import { InventoryListPageComponent } from './list/inventory-list-page.component';
import { InventoryAddEditPageComponent } from './add-edit/inventory-add-edit-page.component';

const routes: Routes = [{
  path: '',
  component: MgmtInventoryComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: InventoryListPageComponent,
      data: {
        code: '#MANAGEMENT-INVENTORY-PAGE',
      },
    },
    {
      path: ':action',
      component: InventoryAddEditPageComponent,
      data: {
        code: '#MANAGEMENT-INVENTORY-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoMgmtInventoryRoutingModule {
}
