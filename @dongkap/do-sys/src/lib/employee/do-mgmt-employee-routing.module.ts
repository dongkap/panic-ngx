import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { MgmtEmployeeComponent } from './do-mgmt-employee.component';
import { EmployeeListPageComponent } from './list/employee-list-page.component';
import { EmployeeAddPageComponent } from './add/employee-add-page.component';
import { EmployeeEditPageComponent } from './edit/employee-edit-page.component';
import { EmployeeAddPersonalInformationComponent } from './add/personal-information/employee-add-personal-information.component';
import { EmployeeAddEducationComponent } from './add/education/employee-add-education.component';
import { EmployeeAddEmployeeStatusComponent } from './add/employee-status/employee-add-employee-status.component';

const routes: Routes = [{
  path: '',
  component: MgmtEmployeeComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: EmployeeListPageComponent,
      data: {
        code: '#MANAGEMENT-EMPLOYEE-PAGE',
      },
    },
    {
      path: 'add',
      component: EmployeeAddPageComponent,
      data: {
        name: 'Manage Employee',
        code: '#MANAGEMENT-EMPLOYEE-PAGE',
        baseUrl: '/app/mgmt/employee',
      },
      children: [
        {
          path: 'personal-information',
          component: EmployeeAddPersonalInformationComponent,
          data: {
            title: 'Personal Information',
            code: '#MANAGEMENT-EMPLOYEE-PAGE',
          },
        },
        {
          path: 'education',
          component: EmployeeAddEducationComponent,
          data: {
            title: 'Last Education',
            code: '#MANAGEMENT-EMPLOYEE-PAGE',
          },
        },
        {
          path: 'employee-status',
          component: EmployeeAddEmployeeStatusComponent,
          data: {
            title: 'Employee Status',
            code: '#MANAGEMENT-EMPLOYEE-PAGE',
          },
        },
        {
          path: '**',
          redirectTo: 'personal-information',
        },
      ],
    },
    {
      path: 'edit',
      component: EmployeeEditPageComponent,
      data: {
        code: '#MANAGEMENT-EMPLOYEE-PAGE',
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
export class DoMgmtEmployeeRoutingModule {
}
