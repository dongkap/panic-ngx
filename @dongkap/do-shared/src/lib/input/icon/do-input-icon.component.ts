import { Component, Input, ViewEncapsulation, Optional, Self, Inject, LOCALE_ID, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValueAccessorDirective } from '../../base/value-accessor.component';

@Component({
  selector: 'do-input-icon',
  styleUrls: ['./do-input-icon.component.scss'],
  templateUrl: './do-input-icon.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoInputIconComponent extends ValueAccessorDirective<string> {
  @Input() placeholder: string;
  @Input() colLabel: number = 3;
  @Input() colInput: number = 9;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 100;
  @Input() buttontype: string = 'btn-primary';
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Input() iconcursor: boolean = false;
  @Input() eva: boolean = false;
  @Input() icon: string = 'search-outline';
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
