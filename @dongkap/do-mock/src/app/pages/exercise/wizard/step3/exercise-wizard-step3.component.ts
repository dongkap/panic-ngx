import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { DoWizardStep } from '@dongkap/do-shared';

@Component({
  selector: 'ngx-exercise-wizard-step3',
  templateUrl: 'exercise-wizard-step3.component.html',
  styleUrls: ['./exercise-wizard-step3.component.scss'],
})
export class ExerciseWizardStep3Component extends DoWizardStep {

  public skillData = [
    {
      name: 'Java',
      id: 'java',
      selected: false,
      disabled: false,
    },
    {
      name: 'PHP',
      id: 'php',
      selected: false,
      disabled: false,
    },
    {
      name: 'Angular',
      id: 'angular',
      selected: false,
      disabled: false,
    },
    {
      name: 'C++',
      id: 'c++',
      selected: false,
      disabled: false,
    },
    {
      name: 'C#',
      id: 'C#',
      selected: false,
      disabled: false,
    },
  ];

  constructor(
    public injector: Injector) {
    super(injector, 'step3', {
      skill: [{
        value: null,
        disabled: false,
      }, Validators.required],
      others: [{
        value: null,
        disabled: false,
      }],
    });
  }

  validateRoute() {
    if (!this.formGroup.controls['step2']?.valid) {
      this.router.navigate(['/exercise/wizard/step-2']);
    }
  }

}
