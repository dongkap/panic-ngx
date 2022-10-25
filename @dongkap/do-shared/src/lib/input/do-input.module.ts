import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NbInputModule, NbIconModule } from '@nebular/theme';
import { DoBaseModule } from '../base/do-base.module';
import { DoInputTextComponent } from './text/do-input-text.component';
import { DoInputCurrencyComponent } from './currency/do-input-currency.component';
import { DoInputIconComponent } from './icon/do-input-icon.component';
import { DoInputBaseIconComponent } from './icon/do-input-base-icon.component';
import { CurrencyMaskDirective } from './currency/directive/currency.directive';
import { DoInputFileComponent } from './file/do-input-file.component';

export const INPUT_COMPONENTS = [
  DoInputTextComponent,
  DoInputBaseIconComponent,
  DoInputIconComponent,
  DoInputCurrencyComponent,
  DoInputFileComponent,
];
export const INPUT_DIRECTIVES = [
  CurrencyMaskDirective,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbIconModule,
    TranslateModule,
    DoBaseModule,
  ],
  declarations: [
    ...INPUT_COMPONENTS,
    ...INPUT_DIRECTIVES,
  ],
  exports: [
    ...INPUT_COMPONENTS,
    ...INPUT_DIRECTIVES,
    NbInputModule,
  ],
})
export class DoInputModule { }
