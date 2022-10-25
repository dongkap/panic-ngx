import { Component, Input, ViewEncapsulation, Optional, Self, Inject, LOCALE_ID } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValueAccessorDirective } from '../../base/value-accessor.component';

@Component({
  selector: 'do-input-text',
  styleUrls: ['./do-input-text.component.scss'],
  templateUrl: './do-input-text.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoInputTextComponent extends ValueAccessorDirective<string> {
  @Input() placeholder: string;
  @Input() colLabel: number = 3;
  @Input() colInput: number = 9;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 100;
  @Input() min: number = 0;
  @Input() max: number = 999;
  @Input() step: number = 1;
  @Input() capslock: boolean = false;
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Input() togglePassword: boolean = false;
  @Input() showPassword: boolean = false;
  public icon: string = 'eye-outline';

  constructor(
    @Optional() @Self() ngControl: NgControl,
    @Inject(LOCALE_ID) public locale: string) {
    super(ngControl, locale);
  }

  onInit() {
    if (this.type === 'password') {
      this.togglePassword = true;
    }
  }

  onShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.icon = this.showPassword ? 'eye-off-outline' :  'eye-outline';
    this.type = this.showPassword ? 'text' :  'password';
  }

  onKeyUp(event: KeyboardEvent) {
    if (this.capslock) {
      this.value = this.value.toUpperCase();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.type === 'number') {
      if (event.key.toUpperCase() === 'E'){
        return false;
      }
      if (this.step >= 1 && event.key === '.') {
        return false;
      }
      if (this.min >= 0 && event.key === '-') {
        return false;
      }
      if (this.value) {
        if (this.value.length >= this.maxLength) {
          if (
            ['DELETE', 'BACKSPACE', 'TAB', 'ESCAPE', 'ENTER'].indexOf(event.key.toUpperCase()) !== -1 ||
            (event.key.toUpperCase() === 'A' && event.ctrlKey === true) || // Allow: Ctrl+A
            (event.key.toUpperCase() === 'C' && event.ctrlKey === true) || // Allow: Ctrl+C
            (event.key.toUpperCase() === 'X' && event.ctrlKey === true) || // Allow: Ctrl+X
            (event.key.toUpperCase() === 'A' && event.metaKey === true) || // Cmd+A (Mac)
            (event.key.toUpperCase() === 'C' && event.metaKey === true) || // Cmd+C (Mac)
            (event.key.toUpperCase() === 'X' && event.metaKey === true) || // Cmd+X (Mac)
            (event.key.toUpperCase() === 'END') ||
            (event.key.toUpperCase() === 'HOME') ||
            (event.key.toUpperCase() === 'ARROWLEFT') ||
            (event.key.toUpperCase() === 'ARROWRIGHT')) {
              return true;
          }
          return false;
        }
      }
      return true;
    }
    return true;
  }

}
