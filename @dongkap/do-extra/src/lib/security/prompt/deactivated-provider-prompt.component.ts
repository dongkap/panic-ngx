import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Pattern } from '@dongkap/do-core';

@Component({
  selector: 'do-deactivated-provider-prompt',
  templateUrl: 'deactivated-provider-prompt.component.html',
  styleUrls: ['deactivated-provider-prompt.component.scss'],
})
export class DeactivatedProviderPromptComponent {

  public disabled: boolean = false;
  public patternEmail: string = Pattern.EMAIL;

  public form: FormGroup = new FormGroup({
    email: new FormControl(),
  });

  constructor(protected ref: NbDialogRef<DeactivatedProviderPromptComponent>) {
  }

  submit() {
    this.disabled = true;
    this.ref.close(this.form.get('email').value);
  }
}
