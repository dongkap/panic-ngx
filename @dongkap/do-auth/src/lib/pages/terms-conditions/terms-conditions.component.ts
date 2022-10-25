import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'do-terms-conditions',
  templateUrl: 'terms-conditions.component.html',
  styleUrls: ['terms-conditions.component.scss'],
})
export class TermsConditionsComponent {

  @Input() content: string;
  @Input() action: 'Agree' | 'Close' = 'Agree';

  constructor(protected ref: NbDialogRef<TermsConditionsComponent>) {
  }

  submit() {
    this.ref.close(true);
  }
}
