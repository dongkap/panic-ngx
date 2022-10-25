import { Component, Input } from '@angular/core';
import { DoWizardErrorType } from './do-wizard-error-type.enum';
import { DoWizardError } from './do-wizard.error';

@Component({
  selector: 'do-wizard-error',
  templateUrl: './do-wizard-error.component.html',
  styleUrls: ['./do-wizard-error.component.scss']
})
export class DoWizardErrorComponent {
  @Input() public error: DoWizardError;

  public DoWizardErrorType = DoWizardErrorType;
}
