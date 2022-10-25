import { NgModule } from '@angular/core';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';

import { DoThemeModule } from '@dongkap/do-theme';
import { DoLayoutAuthModule } from './do-layout-auth.module';
import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { PageNotFoundComponent } from './pages/404/404.component';

@NgModule({
  imports: [
    NbButtonModule,
    NbIconModule,
    CommonModule,
    DoThemeModule,
    DoLayoutAuthModule,
    MiscellaneousRoutingModule,
  ],
  declarations: [
    PageNotFoundComponent,
  ],
})
export class MiscellaneousModule { }
