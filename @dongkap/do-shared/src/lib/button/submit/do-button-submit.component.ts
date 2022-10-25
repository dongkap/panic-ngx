import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'do-button-submit',
  styleUrls: ['./do-button-submit.component.scss'],
  templateUrl: './do-button-submit.component.html',
})
export class DoButtonSubmitComponent {
  @Input() colLabel: number = 3;
  @Input() colButton: number = 9;
  @Input() resetTitle: string;
  @Input() submitTitle: string;
  @Input() disabledButton: boolean = false;
  @Input() disabledReset: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';
  @Input() status: 'primary' | 'danger' | 'warning' | 'info' = 'primary';
  @Input() skeleton: boolean = false;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onReset: EventEmitter<any> = new EventEmitter<any>();
  @Input() set formGroupButton(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }
  public formGroup: FormGroup;
  public get disabledForm(): boolean {
    if(this.formGroup) {
      if(!this.formGroup.valid || this.formGroup.pristine) {
        return true;
      }
    }
    return false;
  }

  public submit(event: any) {
    this.onSubmit.emit(event);
  }
  public reset(event: any) {
    this.onReset.emit(event);
  }

}
