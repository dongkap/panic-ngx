import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'do-deactivated-prompt',
  templateUrl: 'deactivated-prompt.component.html',
  styleUrls: ['deactivated-prompt.component.scss'],
})
export class DeactivatedPromptComponent {

  public disabled: boolean = false;
  public password: string;
  public showPassword: boolean = false;
  public icon: string = 'eye-outline';

  constructor(protected ref: NbDialogRef<DeactivatedPromptComponent>) {
  }

  onShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.icon = this.showPassword ? 'eye-off-outline' :  'eye-outline';
  }

  submit(password) {
    this.disabled = true;
    this.ref.close(password);
  }
}
