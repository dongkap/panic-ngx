import { Component, Input, Optional, Self, Inject, LOCALE_ID } from '@angular/core';
import { NgControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { NbCalendarSize, NbDateService } from '@nebular/theme';
import { DatePattern } from '@dongkap/do-core';
import { ValueAccessorDirective } from '../../base/value-accessor.component';

@Component({
  selector: 'do-datepicker',
  styleUrls: ['./do-datepicker.component.scss'],
  templateUrl: './do-datepicker.component.html',
})
export class DoDatePickerComponent extends ValueAccessorDirective<Date> {
    @Input() placeholder: string;
    @Input() colLabel: number = 3;
    @Input() colInput: number = 9;
    @Input() min: Date;
    @Input() max: Date;
    @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;
    @Input() dateMask = [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /[1-3]/, /\d/, /\d/, /\d/];

    constructor(
      @Optional() @Self() ngControl: NgControl,
      public dateService: NbDateService<Date>,
      @Inject(LOCALE_ID) public locale: string) {
      super(ngControl, locale);
      this.pattern = DatePattern.SLASH_DDMMYYYY;
    }

    get value(): Date { return this._value; }

    set value(value: Date) {
      if (this._value !== value) {
        this._value = value;
        this.onChange(formatDate(value, this.format, this.locale));
        const control = this.ngControl.control;
        if (control) {
          control.updateValueAndValidity();
          control.markAsTouched();
          control.markAsDirty();
        }
      }
    }

    public writeValue(value: any): void {
      let date: Date = null;
      if (value) {
        if (String(value).match(this.pattern)) {
          const dateParse: string = this.parse(value);
          if (!isNaN(Date.parse(dateParse))) {
            date = new Date(dateParse);
          }
        }
        this._value = date;
        this.onChange(value);
        const control = this.ngControl.control;
        if (control) {
          control.updateValueAndValidity();
          control.markAsUntouched();
          control.markAsPristine();
        }
      }
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
