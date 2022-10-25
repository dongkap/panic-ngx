import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbInputModule, NbDatepickerModule } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { TranslateModule } from '@ngx-translate/core';
import { DateFormat } from '@dongkap/do-core';
import { DoBaseModule } from '../base/do-base.module';
import { DoDatePickerComponent } from './single/do-datepicker.component';
import { DoDatePickerRangeComponent } from './range/do-datepicker-range.component';
import { id } from 'date-fns/esm/locale'

export const DATEPICKER_COMPONENTS = [
  DoDatePickerComponent,
  DoDatePickerRangeComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbMomentDateModule,
    NbDateFnsDateModule.forChild({
      format: DateFormat.DATE,
      parseOptions: {
        locale: id,
        awareOfUnicodeTokens: true,
      },
      formatOptions: {
        locale: id,
        awareOfUnicodeTokens: true,
      },
    }),
    TranslateModule,
    DoBaseModule,
  ],
  declarations: [
    ...DATEPICKER_COMPONENTS,
  ],
  exports: [
    ...DATEPICKER_COMPONENTS,
  ],
})
export class DoDatePickerModule { }
