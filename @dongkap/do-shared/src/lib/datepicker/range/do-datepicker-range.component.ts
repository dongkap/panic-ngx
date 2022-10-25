import {
  Component,
  Input,
  Optional,
  Self,
  Inject,
  LOCALE_ID
} from '@angular/core';
import { formatDate } from '@angular/common';
import { NgControl } from '@angular/forms';
import { NbCalendarSize } from '@nebular/theme';
import { ValueAccessorDirective } from '../../base/value-accessor.component';

@Component({
  selector: 'do-datepicker-range',
  styleUrls: ['./do-datepicker-range.component.scss'],
  templateUrl: './do-datepicker-range.component.html',
})
export class DoDatePickerRangeComponent extends ValueAccessorDirective<any> {
    @Input() placeholder: string;
    @Input() colLabel: number = 3;
    @Input() colInput: number = 9;
    @Input() icon: boolean = false;
    @Input() min: Date;
    @Input() max: Date;
    @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;
    @Input() dateMask = [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /[1-3]/, /\d/, /\d/, /\d/,
                         ' ', '-', ' ',
                         /[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /[1-3]/, /\d/, /\d/, /\d/];

    constructor(
      @Optional() @Self() ngControl: NgControl,
      @Inject(LOCALE_ID) public locale: string) {
      super(ngControl, locale);
    }

    get value(): any { return this._value; }

    set value(value: any) {
      if (value) {
        if (this._value !== value) {
          if (value?.start && value?.end) {
            this._value = value;
            this.onChange({
              start: formatDate(value?.start, this.format, this.locale),
              end: formatDate(value?.end, this.format, this.locale),
            });
            const control = this.ngControl.control;
            if (control) {
              control.updateValueAndValidity();
              control.markAsTouched();
              control.markAsDirty();
            }
          } else{
            this.enableError();
          }
        }
      } else {
        this.onChange(null);
        if (this.ngControl.control.hasError('daterange')) {
          this.disableError();
        }
      }
    }

    public writeValue(value: any): void {
      if (value) {
        const dates: any = {};
        const dateStart: Date = new Date(this.parse(value?.start));
        const dateEnd: Date = new Date(this.parse(value?.end));
        if (dateStart.getTime() < dateEnd.getTime()) {
          const startDateParse: string = this.parse(value?.start);
          if (!isNaN(Date.parse(startDateParse))) {
            dates['start'] = new Date(startDateParse);
          }
          const endDateParse: string = this.parse(value?.end);
          if (!isNaN(Date.parse(endDateParse))) {
            dates['end'] = new Date(endDateParse);
          }
          this._value = dates;
          this.onChange(dates);
        }
      }
      const control = this.ngControl.control;
      if (control) {
        control.updateValueAndValidity();
        control.markAsUntouched();
        control.markAsPristine();
      }
    }

    public onTyped(value: string) {
      if (value) {
        if (value.includes(' - ')) {
          const arr: any[] = value.split(' - ');
          const dateStart: Date = new Date(this.parse(arr[0]));
          const dateEnd: Date = new Date(this.parse(arr[1]));
          if (dateStart.getTime() <= dateEnd.getTime()) {
            this.onChange({
              start: formatDate(dateStart, this.format, this.locale),
              end: formatDate(dateEnd, this.format, this.locale),
            });
          } else{
            this.enableError();
          }
        } else{
          this.enableError();
        }
      } else {
        if (this.ngControl.control.hasError('daterange')) {
          this.disableError();
        }
      }
    }

    private enableError() {
      this.ngControl.control.setErrors({ daterange: true });
    }

    private disableError() {
      this.ngControl.control.setErrors({ daterange: false });
      this.ngControl.control.updateValueAndValidity();
    }

    /**
     * Parsing from String to Date, not return format date
     */
    private parse(value: any): string {
      const year: string = String(value).split('/')[2];
      const month: string = String(value).split('/')[1];
      const day: string = String(value).split('/')[0];
      return year + '/' + month + '/' + day;
    }
}
