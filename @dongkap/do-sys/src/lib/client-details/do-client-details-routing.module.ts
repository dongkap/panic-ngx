import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { DoClientDetailsComponent } from './do-client-details.component';
import { ClientDetailsEditPageComponent } from './edit/client-details-edit-page.component';
import { ClientDetailsListComponent } from './list/client-details-list.component';

const routes: Routes = [{
  path: '',
  component: DoClientDetailsComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: ClientDetailsListComponent,
      data: {
        code: '#CLIENT-DETAILS-PAGE',
        title: 'OAuth 2.0 Client IDs'
      },
    },
    {
      path: ':action',
      component: ClientDetailsEditPageComponent,
      data: {
        code: '#CLIENT-DETAILS-PAGE',
        title: 'OAuth 2.0 Client IDs',
        reuse: true
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoClientDetailsRoutingModule {
}
