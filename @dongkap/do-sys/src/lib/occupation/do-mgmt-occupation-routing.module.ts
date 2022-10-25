import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { MgmtOccupationComponent } from './do-mgmt-occupation.component';
import { OccupationListPageComponent } from './list/occupation-list-page.component';
import { OccupationAddEditPageComponent } from './add-edit/occupation-add-edit-page.component';

const routes: Routes = [{
  path: '',
  component: MgmtOccupationComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: OccupationListPageComponent,
      data: {
        code: '#MANAGEMENT-OCCUPATION-PAGE',
      },
    },
    {
      path: ':action',
      component: OccupationAddEditPageComponent,
      data: {
        code: '#MANAGEMENT-OCCUPATION-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoMgmtOccupationRoutingModule {
}
