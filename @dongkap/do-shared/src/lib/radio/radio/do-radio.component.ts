import { Component, Input, Optional, Self, Inject, LOCALE_ID } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValueAccessorDirective } from '../../base/value-accessor.component';
import { RadioModel } from '../models/radio.model';

@Component({
  selector: 'do-radio',
  styleUrls: ['./do-radio.component.scss'],
  templateUrl: './do-radio.component.html',
})
export class DoRadioComponent extends ValueAccessorDirective<any> {
  @Input() placeholder: string;
  @Input() colLabel: number = 3;
  @Input() colInput: number = 9;
  @Input() data: RadioModel[];

  constructor(
    @Optional() @Self() ngControl: NgControl,
    @Inject(LOCALE_ID) public locale: string) {
    super(ngControl, locale);
  }

}
