import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-exercise-radio',
  templateUrl: 'exercise-radio.component.html',
  styleUrls: ['./exercise-radio.component.scss'],
})
export class ExerciseRadioComponent {

  formGroup: FormGroup;
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

  public religionData = [
    {
      name: 'Moeslem',
      value: 'Moeslem',
    },
    {
      name: 'Christian',
      value: 'Christian',
    },
    {
      name: 'Hindi',
      value: 'Hindi',
    },
    {
      name: 'Budha',
      value: 'Budha',
    },
  ];

  public employeeData = [
    {
      name: 'Permanent',
      value: 'Permanent',
    },
    {
      name: 'Contract',
      value: 'Contract',
    }
  ];

  constructor(
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        gender: [{
          value: 'Male',
          disabled: false,
        }],
        religion: [{
          value: null,
          disabled: false,
        }],
        employee: [{
          value: 'Contract',
          disabled: true,
        }],
        skeletonRadio: [{
          value: null,
          disabled: true
        }],
      });
    }

  onSubmit(){
    console.log(this.formGroup.value);
  }

  onReset(){
    this.formGroup.reset();
  }

}
