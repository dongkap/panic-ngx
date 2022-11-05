import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomePageComponent } from '@dongkap/do-extra';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomePageComponent,
    },
    {
      path: 'monitoring',
      loadChildren: () => import('../panic/panic-dashboard-wrapper.module')
        .then(m => m.PanicDashboardWrapperModule),
    },
    {
      path: 'statistics',
      loadChildren: () => import('../panic/panic-statistics-wrapper.module')
        .then(m => m.PanicStatisticsWrapperModule),
    },
    {
      path: 'reports',
      loadChildren: () => import('../panic/panic-reports-wrapper.module')
        .then(m => m.PanicReportsWrapperModule),
    },
    {
      path: 'mgmt/corporate',
      loadChildren: () => import('../sys/sys-mgmt-corporate-wrapper.module')
        .then(m => m.SysMgmtCorporateWrapperModule),
    },
    {
      path: 'mgmt/occupation',
      loadChildren: () => import('../sys/sys-mgmt-occupation-wrapper.module')
        .then(m => m.SysMgmtOccupationWrapperModule),
    },
    {
      path: 'mgmt/employee',
      loadChildren: () => import('../sys/sys-mgmt-employee-wrapper.module')
        .then(m => m.SysMgmtEmployeeWrapperModule),
    },
    {
      path: 'mgmt/job-placement',
      loadChildren: () => import('../sys/sys-mgmt-job-placement-wrapper.module')
        .then(m => m.SysMgmtJobPlacementWrapperModule),
    },
    {
      path: 'mgmt/inventory',
      loadChildren: () => import('../sys/sys-mgmt-inventory-wrapper.module')
        .then(m => m.SysMgmtInventoryWrapperModule),
    },
    {
      path: 'mgmt/business-partner',
      loadChildren: () => import('../sys/sys-mgmt-business-partner-wrapper.module')
        .then(m => m.SysMgmtBusinessPartnerWrapperModule),
    },
    {
      path: 'mgmt/apps',
      loadChildren: () => import('../sys/sys-mgmt-apps-wrapper.module')
        .then(m => m.SysMgmtAppsWrapperModule),
    },
    {
      path: 'mgmt/client-ids',
      loadChildren: () => import('../sys/sys-client-details-wrapper.module')
        .then(m => m.SysClientDetailsWrapperModule)
    },
    {
      path: 'mgmt/role',
      loadChildren: () => import('../sys/sys-mgmt-role-wrapper.module')
        .then(m => m.SysMgmtRoleWrapperModule),
    },
    {
      path: 'mgmt/menu',
      loadChildren: () => import('../sys/sys-mgmt-menu-wrapper.module')
        .then(m => m.SysMgmtMenuWrapperModule),
    },
    {
      path: 'employee/profile',
      loadChildren: () => import('../sys/sys-employee-profile-wrapper.module')
        .then(m => m.SysEmployeeProfileWrapperModule),
    },
    {
      path: 'sysconf/parameter',
      loadChildren: () => import('../sys/sys-parameter-wrapper.module')
        .then(m => m.SysParameterWrapperModule),
    },
    {
      path: 'sysconf/i18n',
      loadChildren: () => import('../sys/sys-locale-wrapper.module')
        .then(m => m.SysLocaleWrapperModule),
    },
    {
      path: 'user',
      loadChildren: () => import('../extra/extra-wrapper.module')
        .then(m => m.ExtraWrapperModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: '/miscellaneous/404',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
