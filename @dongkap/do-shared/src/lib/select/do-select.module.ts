import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { DoBaseModule } from '../base/do-base.module';
import { DoSelectComponent } from './do-select.component';
import { ContentSelectDirective } from './directive/content-select.directive';

export const SELECT_COMPONENTS = [
  DoSelectComponent,
];

export const SELECT_DIRECTIVES = [
  ContentSelectDirective,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule,
    DoBaseModule,
  ],
  declarations: [
    ...SELECT_COMPONENTS,
    ...SELECT_DIRECTIVES,
  ],
  exports: [
    ...SELECT_COMPONENTS,
    ...SELECT_DIRECTIVES,
  ],
})
export class DoSelectModule { }
