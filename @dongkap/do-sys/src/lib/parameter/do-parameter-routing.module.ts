import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { ParameterComponent } from './do-parameter.component';
import { ParameterListGroupPageComponent } from './parameter-group/list/parameter-list-group-page.component';
import { ParameterAddGroupPageComponent } from './parameter-group/add/parameter-add-group-page.component';
import { ParameterListDetailPageComponent } from './parameter-detail/list/parameter-list-detail-page.component';
import { ParameterAddEditMultiDetailPageComponent } from './parameter-detail/add-edit-multi/parameter-add-edit-multi-detail-page.component';
import { ParameterAddEditSingleDetailPageComponent } from './parameter-detail/add-edit-single/parameter-add-edit-single-detail-page.component';

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
      path: 'group/add',
      component: ParameterAddGroupPageComponent,
      data: {
        code: '#SYSCONF-PARAMETER-PAGE',
      },
    },
    {
      path: 'detail/:parameterGroupCode',
      component: ParameterListDetailPageComponent,
      data: {
        code: '#SYSCONF-PARAMETER-PAGE',
      },
    },
    {
      path: 'detail/i18n/:parameterGroupCode',
      component: ParameterAddEditMultiDetailPageComponent,
      data: {
        code: '#SYSCONF-PARAMETER-PAGE',
      },
    },
    {
      path: 'detail/i18n/:parameterGroupCode/:parameterCode',
      component: ParameterAddEditMultiDetailPageComponent,
      data: {
        code: '#SYSCONF-PARAMETER-PAGE',
      },
    },
    {
      path: 'detail/value/:parameterGroupCode',
      component: ParameterAddEditSingleDetailPageComponent,
      data: {
        code: '#SYSCONF-PARAMETER-PAGE',
      },
    },
    {
      path: 'detail/value/:parameterGroupCode/:parameterCode',
      component: ParameterAddEditSingleDetailPageComponent,
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
