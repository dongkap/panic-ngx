import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-exercise-input-file',
  templateUrl: 'exercise-input-file.component.html',
  styleUrls: ['./exercise-input-file.component.scss'],
})
export class ExerciseInputFileComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        photo: [{
          value: null,
          disabled: false,
        }],
        idCard: [{
          value: null,
          disabled: true,
        }],
        paySlip: [{
          value: null,
          disabled: false,
        }],
        skeletonFile: [{
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
