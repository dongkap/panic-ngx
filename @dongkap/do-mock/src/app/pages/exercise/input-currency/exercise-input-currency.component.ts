import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-exercise-input-currency',
  templateUrl: 'exercise-input-currency.component.html',
  styleUrls: ['./exercise-input-currency.component.scss'],
})
export class ExerciseInputCurrencyComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        salary: [{
          value: null,
          disabled: false,
        }],
        tax: [{
          value: '50000.123',
          disabled: false,
        }],
        insurance: [{
          value: null,
          disabled: true,
        }],
        skeletonCurrency: [{
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
