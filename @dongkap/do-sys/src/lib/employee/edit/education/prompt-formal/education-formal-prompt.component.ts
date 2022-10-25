import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { API, APIModel, HttpBaseModel } from '@dongkap/do-core';
import { SelectParamModel } from '@dongkap/do-shared';

@Component({
  selector: 'do-education-formal-prompt',
  templateUrl: 'education-formal-prompt.component.html',
  styleUrls: ['education-formal-prompt.component.scss'],
})
export class EmployeeEducationFormalPromptComponent implements OnInit {

  @Input() public education: any;
  public action: 'Add' | 'Edit' = 'Add';
  public formGroup: FormGroup;
  public apiSelectEducationalLevel: HttpBaseModel;
  public paramSelectEducationalLevel: SelectParamModel[];

  constructor(
    @Inject(API) api: APIModel,
    formBuilder: FormBuilder,
    protected ref: NbDialogRef<EmployeeEducationFormalPromptComponent>) {
      this.formGroup = formBuilder.group({
        educationalLevel: [],
        school: [],
        startYear: [],
        endYear: [],
      });
      this.apiSelectEducationalLevel = api['master']['select-parameter'];
      this.paramSelectEducationalLevel = [{
        key: 'parameterGroupCode',
        value: 'EDUCATIONAL_LEVEL',
      }, {
        key: 'parameterCodeNotIn',
        value: 'EDUCATIONAL_LEVEL.NO_EDUCATION',
      }];
  }

  ngOnInit(): void {
    if (this.education) {
      this.action = 'Edit';
      this.formGroup.get('educationalLevel').setValue({
        label: this.education.educationalLevel,
        value: this.education.educationalLevelCode
      });
      this.formGroup.get('educationalLevel').disable({onlySelf: true});
      this.formGroup.get('school').setValue(this.education.schoolName);
      this.formGroup.get('startYear').setValue(this.education.startYear);
      this.formGroup.get('endYear').setValue(this.education.endYear);
    } else {
      this.action = 'Add';
    }
  }

  onSubmit() {
    const data: any = {
      education: {
        id: this.education?.id,
        educationalLevel: this.formGroup.get('educationalLevel').value?.value,
        schoolName: this.formGroup.get('school').value,
        startYear: this.formGroup.get('startYear').value,
        endYear: this.formGroup.get('endYear').value,
      }
    };
    this.ref.close(data);
  }

  onReset() {
    this.ref.close();
  }

}
