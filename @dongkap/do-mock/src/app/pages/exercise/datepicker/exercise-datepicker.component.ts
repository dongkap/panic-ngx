import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-exercise-datepicker',
  templateUrl: 'exercise-datepicker.component.html',
  styleUrls: ['./exercise-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExerciseDatePickerComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        dateOfBirth: [],
        timesheet: [{
          value: {
            start: '08/10/2021',
            end: '10/11/2021',
          },
          disabled: false,
        }],
        modifyDate: [{
          value: null,
          disabled: true,
        }],
        skeletonDatepicker: [{
          value: null,
          disabled: true
        }],
      });
    }

  ngOnInit(): void {
    this.formGroup.controls['dateOfBirth'].setValue('27/12/1990');
  }

  onSubmit(){
    console.log(this.formGroup.value);
  }

  onReset(){
    this.formGroup.reset();
  }

}
