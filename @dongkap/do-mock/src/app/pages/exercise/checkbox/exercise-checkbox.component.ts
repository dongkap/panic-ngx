import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-exercise-checkbox',
  templateUrl: 'exercise-checkbox.component.html',
  styleUrls: ['./exercise-checkbox.component.scss'],
})
export class ExerciseCheckboxComponent {

  formGroup: FormGroup;
  public optionsData = [
    {
      name: 'One',
      id: 'one',
      selected: false,
      disabled: false,
    },
    {
      name: 'Two',
      id: 'two',
      selected: false,
      disabled: false,
    },
    {
      name: 'Three',
      id: 'three',
      selected: false,
      disabled: true,
    },
    {
      name: 'Four',
      id: 'four',
      selected: false,
      disabled: false,
    },
  ];

  public termsData = [{
    name: 'Terms & Conditions',
    id: 'terms',
    selected: false,
    disabled: false,
  }];

  public disabledData = [{
      id: 'disabled',
  }];

  constructor(
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        options: [{
          value: null,
          disabled: false,
        }],
        terms: [{
          value: null,
          disabled: false,
        },
        [Validators.requiredTrue]],
        disabled: [{
          value: [{
            id: 'disabled',
            selected: true,
          }],
          disabled: true,
        }],
        skeletonCheckbox: [{
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

  onChecked(event){
    console.log(event);
  }

}
