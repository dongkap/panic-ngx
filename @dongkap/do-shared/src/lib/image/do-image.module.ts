import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { DoBaseModule } from '../base/do-base.module';
import { ImageUploadComponent } from './upload/image-upload.component';
import { TranslateModule } from '@ngx-translate/core';

export const IMAGE_COMPONENTS = [
  ImageUploadComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NbButtonModule,
    NbIconModule,
    DoBaseModule,
  ],
  declarations: [
    ...IMAGE_COMPONENTS,
  ],
  exports: [
    ...IMAGE_COMPONENTS,
  ],
})
export class DoImageModule { }
