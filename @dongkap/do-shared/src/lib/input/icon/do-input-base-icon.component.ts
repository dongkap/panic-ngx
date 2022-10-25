import { Component, Input, ViewEncapsulation, Optional, Self, Inject, LOCALE_ID, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValueAccessorDirective } from '../../base/value-accessor.component';

@Component({
  selector: 'do-input-base-icon',
  styleUrls: ['./do-input-base-icon.component.scss'],
  templateUrl: './do-input-base-icon.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoInputBaseIconComponent extends ValueAccessorDirective<string> {
  @Input() placeholder: string;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 100;
  @Input() iconcursor: boolean = false;
  @Input() icon: string = 'search-outline';
  @Input() buttontype: string = 'btn-primary';
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Output() clickIcon: EventEmitter<string> = new EventEmitter<string>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Optional() @Self() ngControl: NgControl,
    @Inject(LOCALE_ID) public locale: string) {
    super(ngControl, locale);
  }

  onClickIcon(): void {
    if (this.iconcursor) { this.clickIcon.emit(this.value); }
  }

  onFocus(value: any): void {
    this.focus.emit(value);
    this.onTouched(value);
  }
}
