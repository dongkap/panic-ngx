import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NbButtonModule } from '@nebular/theme';
import { DoButtonComponent } from './single/do-button.component';
import { DoButtonSubmitComponent } from './submit/do-button-submit.component';
import { DoBaseModule } from '../base/do-base.module';

export const BUTTON_COMPONENTS = [
  DoButtonComponent,
  DoButtonSubmitComponent,
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NbButtonModule,
    DoBaseModule,
  ],
  declarations: [
    ...BUTTON_COMPONENTS,
  ],
  exports: [
    ...BUTTON_COMPONENTS,
  ],
})
export class DoButtonModule { }
