import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pattern } from '@dongkap/do-core';

@Component({
  selector: 'ngx-exercise-input-text',
  templateUrl: 'exercise-input-text.component.html',
  styleUrls: ['./exercise-input-text.component.scss'],
})
export class ExerciseInputTextComponent {

  formGroup: FormGroup;
  public patternUsername: string = Pattern.USERNAME;
  public patternEmail: string = Pattern.EMAIL;

  constructor(
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        name: [{
          value: 'John Doe',
          disabled: true,
        }],
        username: [{
          value: null,
          disabled: false,
        }],
        email: [{
          value: null,
          disabled: false,
        }],
        skeletonText: [{
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
