import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'do-button',
  styleUrls: ['./do-button.component.scss'],
  templateUrl: './do-button.component.html',
})
export class DoButtonComponent {
    @Input() formGroupButton: FormGroup = new FormGroup({});
    @Input() name: string;
    @Input() disabledButton: boolean = false;
    @Input() type: 'button' | 'submit' | 'reset' = 'submit';
    @Input() status: 'primary' | 'danger' | 'warning' | 'info' = 'primary';
    @Input() size: 'tiny' | 'small' | 'medium' | 'large' | 'giant' = 'medium';
    @Input() skeleton: boolean = false;
    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

    public click(event: any) {
      this.onSubmit.emit(event);
    }
}
