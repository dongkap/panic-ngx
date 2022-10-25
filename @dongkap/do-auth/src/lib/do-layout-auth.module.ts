import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbLayoutModule,
  NbIconModule,
} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DoThemeModule } from '@dongkap/do-theme';
import { AuthComponent } from './pages/layout/auth.component';
import { AuthBlockComponent } from './pages/layout/auth-block/auth-block.component';

@NgModule({
  declarations: [
    AuthComponent,
    AuthBlockComponent,
  ],
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    DoThemeModule,
  ],
  exports: [
    AuthComponent,
    AuthBlockComponent,
  ],
})
export class DoLayoutAuthModule {}
