import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { DoLabelTextComponent } from './do-label-text.component';
import { DoBaseModule } from '../base/do-base.module';

export const LABEL_COMPONENTS = [
  DoLabelTextComponent,
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DoBaseModule,
    NbButtonModule,
  ],
  declarations: [
    ...LABEL_COMPONENTS,
  ],
  exports: [
    ...LABEL_COMPONENTS,
  ],
})
export class DoLabelModule { }
