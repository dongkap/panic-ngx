import { Component, Injector, } from '@angular/core';
import { Validators } from '@angular/forms';
import { DoWizardStep } from '@dongkap/do-shared';
import { Pattern } from '@dongkap/do-core';

@Component({
  selector: 'ngx-exercise-wizard-step1',
  templateUrl: 'exercise-wizard-step1.component.html',
  styleUrls: ['./exercise-wizard-step1.component.scss'],
})
export class ExerciseWizardStep1Component extends DoWizardStep {

  public formGroupName: string = 'step1';
  public patternEmail: string = Pattern.EMAIL;
  public genderData = [
    {
      name: 'Male',
      value: 'Male',
    },
    {
      name: 'Female',
      value: 'Female',
    },
  ];

  constructor(
    public injector: Injector) {
    super(injector, 'step1', {
      name: [{
        value: 'John Doe',
        disabled: false,
      }, Validators.required],
      email: [{
        value: null,
        disabled: false,
      }, Validators.required],
      gender: [{
        value: 'Male',
        disabled: false,
      }],
      dateOfBirth: [{
        value: '01/01/2021',
        disabled: false,
      }, Validators.required],
    });
  }

  validateRoute() {}

}
