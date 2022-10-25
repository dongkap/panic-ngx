import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { MgmtJobPlacementComponent } from './do-mgmt-job-placement.component';
import { JobPlacementListPageComponent } from './list/job-placement-list-page.component';
import { JobPlacementEditPageComponent } from './edit/job-placement-edit-page.component';

const routes: Routes = [{
  path: '',
  component: MgmtJobPlacementComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: JobPlacementListPageComponent,
      data: {
        code: '#MANAGEMENT-JOB-PLACEMENT-PAGE',
      },
    },
    {
      path: 'edit',
      component: JobPlacementEditPageComponent,
      data: {
        code: '#MANAGEMENT-JOB-PLACEMENT-PAGE',
      },
    },
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoMgmtJobPlacementRoutingModule {
}
