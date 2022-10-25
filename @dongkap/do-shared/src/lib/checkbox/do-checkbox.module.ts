import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NbCheckboxModule } from '@nebular/theme';
import { DoBaseModule } from '../base/do-base.module';
import { DoCheckboxComponent } from './checkbox/do-checkbox.component';

const CHECKBOX_COMPONENTS = [
  DoCheckboxComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    TranslateModule,
    DoBaseModule,
  ],
  declarations: [
    ...CHECKBOX_COMPONENTS,
  ],
  exports: [
    ...CHECKBOX_COMPONENTS,
  ],
})
export class DoCheckBoxModule { }
