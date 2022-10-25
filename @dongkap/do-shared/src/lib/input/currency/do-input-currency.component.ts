import { Component, Input, ViewEncapsulation, Optional, Self, Inject, LOCALE_ID } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValueAccessorDirective } from '../../base/value-accessor.component';

@Component({
  selector: 'do-input-currency',
  styleUrls: ['./do-input-currency.component.scss'],
  templateUrl: './do-input-currency.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoInputCurrencyComponent extends ValueAccessorDirective<string> {
  @Input() placeholder: string;
  @Input() colLabel: number = 3;
  @Input() colInput: number = 9;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 100;
  @Input('prefix') prefix: string = 'Rp';
  @Input('decimal') decimalSeparator: string = '.';
  @Input('thousand') thousandsSeparator: string = ',';
  @Input('suffix') suffix: string = ',-';
  @Input('padding') padding: number = 5;

  constructor(
    @Optional() @Self() ngControl: NgControl,
    @Inject(LOCALE_ID) public locale: string) {
    super(ngControl, locale);
  }

  public writeValue(value: any): void {
    this._value = value ? this.transform(value) : value;
    this.onChange(this.value);
    const control = this.ngControl.control;
    if (control) {
        control.updateValueAndValidity();
        control.markAsTouched();
        control.markAsDirty();
    }
  }

  transform(value): string {
    const {val, frac} = this.toNumber(value);
    const v = val.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    return this.prefix.concat(' ').concat(v).concat(frac).concat(this.suffix);
  }

  toNumber(value: string): {val: string, frac: string} {
    const [ val = '', frac = ''] = (value || '').split(this.decimalSeparator);
    let fraction = '';
    if (frac) {
      if (parseInt(frac, 10) > 0) {
        fraction = this.decimalSeparator + this.pad(frac, this.padding).substring(0, this.padding);
      }
    }
    return {val, frac: fraction};
  }

  private pad(val, size): string {
    while (val.length < size) { val = val + '0'; }
    return val;
  }

}
