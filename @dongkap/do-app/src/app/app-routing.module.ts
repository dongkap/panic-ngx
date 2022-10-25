import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '@dongkap/do-auth';
import { CustomPreloadingStrategy } from '@dongkap/do-core';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./pages/main/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth-wrapper.module').then(m => m.AuthWrapperModule),
    data: {
      preload: true,
    },
  },
  {
    path: 'miscellaneous',
    loadChildren: () => import('./pages/miscellaneous/miscellaneous-wrapper.module')
    .then(m => m.MiscellaneousWrapperModule),
    data: {
      preload: true,
    },
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'miscellaneous/404' },
];

const config: ExtraOptions = {
  preloadingStrategy: CustomPreloadingStrategy,
  relativeLinkResolution: 'legacy',
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
