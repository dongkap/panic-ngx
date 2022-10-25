import { Component, Input, Optional, Self, Inject, LOCALE_ID, EventEmitter, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValueAccessorDirective } from '../../base/value-accessor.component';
import { CheckboxModel } from '../models/checkbox.model';

@Component({
  selector: 'do-checkbox',
  styleUrls: ['./do-checkbox.component.scss'],
  templateUrl: './do-checkbox.component.html',
})
export class DoCheckboxComponent extends ValueAccessorDirective<CheckboxModel[]> {
    @Input() colLabel: number = 3;
    @Input() colInput: number = 9;
    @Input() data: CheckboxModel[];
    @Output() onChecked: EventEmitter<any> = new EventEmitter<any>();

    constructor(
      @Optional() @Self() ngControl: NgControl,
      @Inject(LOCALE_ID) public locale: string) {
      super(ngControl, locale);
    }

    onCheckedChange(item: CheckboxModel) {
      if (!this.value) {
        this.value = this.data;
      }
      if (Array.isArray(this.value).valueOf()) {
        let isChecked: boolean = false;
        Array.from(this.value).forEach((value: CheckboxModel) => {
          if (value.selected) {
            isChecked = value.selected;
          }
        });
        if (isChecked) {
          if (this.required) {
            this.ngControl.control.setErrors(null);
          }
        } else {
          this.value = null;
          if (this.required) {
            this.ngControl.control.setErrors({
              required: true,
            });
          }
        }
        this.ngControl.control.markAsTouched();
        this.ngControl.control.markAsDirty();
      }
      this.onChecked.emit(this.value);
    }

    public writeValue(value: CheckboxModel[]): void {
      if (value) {
        this.data = value;
      }
      this._value = value;
      this.onChange(this.value);
      const control = this.ngControl.control;
      if (control) {
          control.updateValueAndValidity();
          control.markAsUntouched();
          control.markAsPristine();
      }
    }
}
