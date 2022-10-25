import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-exercise-editor',
  templateUrl: 'exercise-editor.component.html',
  styleUrls: ['./exercise-editor.component.scss'],
})
export class ExerciseEditorComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        description: [{
          value: 'Lorem Ipsum',
          disabled: true,
        }],
        address: [{
          value: null,
          disabled: false,
        }],
        skeletonEditor: [{
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
