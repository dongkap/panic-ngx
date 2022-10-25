import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbInputModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { DoBaseModule } from '../base/do-base.module';
import { DoTextEditorComponent } from './quill/do-text-editor.component';
import { DoTextareaComponent } from './textarea/textarea.component';

export const EDITOR_COMPONENTS = [
  DoTextEditorComponent,
  DoTextareaComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    QuillModule.forRoot(),
    NbInputModule,
    DoBaseModule,
  ],
  declarations: [
    ...EDITOR_COMPONENTS,
  ],
  exports: [
    ...EDITOR_COMPONENTS,
  ],
})
export class DoEditorModule { }
