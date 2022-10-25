import { Component, Input, ViewEncapsulation, Optional, Self, Inject, LOCALE_ID } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValueAccessorDirective } from '../../base/value-accessor.component';

@Component({
  selector: 'do-text-editor',
  templateUrl: 'do-text-editor.component.html',
  styleUrls: ['./do-text-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DoTextEditorComponent extends ValueAccessorDirective<string> {
  @Input() placeholder: string;
  @Input() colLabel: number = 3;
  @Input() colInput: number = 9;
  @Input() minLength: number = 1;
  @Input() maxLength: number = 250;
  @Input() height: number = 150;

  constructor(
    @Optional() @Self() ngControl: NgControl,
    @Inject(LOCALE_ID) public locale: string) {
    super(ngControl, locale);
  }
}
