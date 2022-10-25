import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'do-warn-message',
  styleUrls: ['./do-warn-message.component.scss'],
  templateUrl: './do-warn-message.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoWarnMessageComponent {
    @Input() warnMessage: string;
    @Input() param: any;
}
