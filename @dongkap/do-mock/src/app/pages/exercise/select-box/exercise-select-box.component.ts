import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectResponseModel } from '@dongkap/do-shared';
import { API, APIModel, HttpBaseModel, HttpMethod } from '@dongkap/do-core';

@Component({
  selector: 'ngx-exercise-select-box',
  templateUrl: 'exercise-select-box.component.html',
  styleUrls: ['./exercise-select-box.component.scss'],
})
export class ExerciseSelectBoxComponent {

  formGroup: FormGroup;
  public apiSelect: HttpBaseModel;
  public dataStaticSelect: SelectResponseModel[] = [
    {
      label: 'Data',
      value: '1',
      disabled: false,
    },
    {
      label: 'true',
      value: '2',
      disabled: false,
    },
    {
      label: 'number',
      value: '3',
      disabled: false,
    },
  ];

  constructor(
    @Inject(API) private api: APIModel,
    private formBuilder: FormBuilder) {
      this.apiSelect = this.api['sample']['select'];
      this.formGroup = this.formBuilder.group({
        searchSelect: [],
        staticSelect: [{
            label: 'number',
        }],
        skeletonSelect: [{
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
