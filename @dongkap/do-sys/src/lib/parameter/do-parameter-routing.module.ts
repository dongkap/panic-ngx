import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { ParameterComponent } from './do-parameter.component';
import { ParameterListGroupPageComponent } from './parameter-group/list/parameter-list-group-page.component';
import { ParameterAddGroupPageComponent } from './parameter-group/add/parameter-add-group-page.component';
import { ParameterListDetailPageComponent } from './parameter-detail/list/parameter-list-detail-page.component';
import { ParameterAddEditDetailPageComponent } from './parameter-detail/add-edit/parameter-add-edit-detail-page.component';

const routes: Routes = [{
  path: '',
  component: ParameterComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: ParameterListGroupPageComponent,
      data: {
        code: '#SYSCONF-PARAMETER-PAGE',
      },
    },
    {
      path: 'group',
      component: ParameterListGroupPageComponent,
      data: {
        code: '#SYSCONF-PARAMETER-PAGE',
      },
    },
    {
      path: 'group/:action',
      component: ParameterAddGroupPageComponent,
      data: {
        code: '#SYSCONF-PARAMETER-PAGE',
      },
    },
    {
      path: 'detail',
      component: ParameterListDetailPageComponent,
      data: {
        code: '#SYSCONF-PARAMETER-PAGE',
      },
    },
    {
      path: 'detail/:action',
      component: ParameterAddEditDetailPageComponent,
      data: {
        code: '#SYSCONF-PARAMETER-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoParameterRoutingModule {
}
