import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'do-error-message',
  styleUrls: ['./do-error-message.component.scss'],
  templateUrl: './do-error-message.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoErrorMessageComponent {
    @Input() hasErrors: boolean = false;
    @Input() errorMessages: string[] = [];
    @Input() param: any;
}
