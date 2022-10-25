import { Component, Input, ViewEncapsulation, Optional, Self, Inject, LOCALE_ID } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValueAccessorDirective } from '../../base/value-accessor.component';

@Component({
  selector: 'do-input-file',
  styleUrls: ['./do-input-file.component.scss'],
  templateUrl: './do-input-file.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoInputFileComponent extends ValueAccessorDirective<string> {
    @Input() placeholder: string;
    @Input() colLabel: number = 3;
    @Input() colInput: number = 9;
    @Input() multiple: boolean = false;

    constructor(
      @Optional() @Self() ngControl: NgControl,
      @Inject(LOCALE_ID) public locale: string) {
      super(ngControl, locale);
    }

}
