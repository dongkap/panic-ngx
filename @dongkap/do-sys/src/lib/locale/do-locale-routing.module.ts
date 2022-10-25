import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardChildService } from '@dongkap/do-auth';
import { LocaleComponent } from './do-locale.component';
import { LocaleListPageComponent } from './list/locale-list-page.component';
import { LocaleAddEditPageComponent } from './add-edit/locale-add-edit-page.component';

const routes: Routes = [{
  path: '',
  component: LocaleComponent,
  canActivateChild: [AuthGuardChildService],
  children: [
    {
      path: '',
      component: LocaleListPageComponent,
      data: {
        code: '#SYSCONF-I18N-PAGE',
      },
    },
    {
      path: ':action',
      component: LocaleAddEditPageComponent,
      data: {
        code: '#SYSCONF-I18N-PAGE',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoLocaleRoutingModule {
}
