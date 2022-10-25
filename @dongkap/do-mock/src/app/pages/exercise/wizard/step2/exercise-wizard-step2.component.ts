import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Pattern } from '@dongkap/do-core';
import { DoWizardStep } from '@dongkap/do-shared';

@Component({
  selector: 'ngx-exercise-wizard-step2',
  templateUrl: 'exercise-wizard-step2.component.html',
  styleUrls: ['./exercise-wizard-step2.component.scss'],
})
export class ExerciseWizardStep2Component extends DoWizardStep {

  public patternUsername: string = Pattern.USERNAME;

  constructor(
    public injector: Injector) {
    super(injector, 'step2', {
      username: [{
        value: null,
        disabled: false,
      }, Validators.required],
      photo: [{
        value: null,
        disabled: false,
      }],
      salary: [{
        value: null,
        disabled: false,
      }, Validators.required],
    });
  }

  validateRoute() {
    if (!this.formGroup.controls['step1']?.valid) {
      this.router.navigate(['/exercise/wizard/step-1']);
    }
  }

}
