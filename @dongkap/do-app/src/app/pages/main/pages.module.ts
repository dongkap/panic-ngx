import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { DoThemeModule } from '@dongkap/do-theme';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DoExtraModule } from '@dongkap/do-extra';
import { MiscellaneousModule } from '@dongkap/do-auth';

@NgModule({
  imports: [
    PagesRoutingModule,
    NbMenuModule,
    DoThemeModule,
    MiscellaneousModule,
    DoExtraModule,
  ],
  declarations: [
    PagesComponent
  ],
})
export class PagesModule {
}
