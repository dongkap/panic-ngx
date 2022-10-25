import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { EmployeeProfileComponent } from './do-employee-profile.component';
import { EmployeeProfilePageComponent } from './page/employee-profile-page.component';

const routes: Routes = [{
  path: '',
  component: EmployeeProfileComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: EmployeeProfilePageComponent,
      data: {
        code: '#EMPLOYEE-PROFILE-PAGE',
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
export class DoEmployeeProfileRoutingModule {
}
