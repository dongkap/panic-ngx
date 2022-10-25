import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpBaseModel } from '@dongkap/do-core';
import { DoWizardStep, SelectParamModel } from '@dongkap/do-shared';

@Component({
  selector: 'do-employee-add-education',
  templateUrl: 'employee-add-education.component.html',
  styleUrls: ['./employee-add-education.component.scss'],
})
export class EmployeeAddEducationComponent extends DoWizardStep implements OnInit, OnDestroy {

  public apiSelectEducationalLevel: HttpBaseModel;
  public paramSelectEducationalLevel: SelectParamModel[];
  public noSchool: boolean = false;

  constructor(
    public injector: Injector) {
    super(injector, 'education', {
      educationalLevel: [{
        value: null,
        disabled: false,
      }, Validators.required],
      school: [{
        value: null,
        disabled: false,
      }],
      startYear: [{
        value: null,
        disabled: false,
      }],
      endYear: [{
        value: null,
        disabled: false,
      }],
      trainingName: [{
        value: null,
        disabled: false,
      }],
      trainingDate: [{
        value: null,
        disabled: false,
      }],
    });
    this.apiSelectEducationalLevel = this.api['master']['select-parameter'];
    this.paramSelectEducationalLevel = [{
      key: 'parameterGroupCode',
      value: 'EDUCATIONAL_LEVEL',
    }];
  }

  ngOnInit(): void {
    const select: any = this.formGroup.get('education').get('educationalLevel').value;
    if (select?.value === 'EDUCATIONAL_LEVEL.NO_EDUCATION') {
      this.noSchool = true;
    } else {
      this.noSchool = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  onSelectEducationalLevel(select: any): void {
    if (select?.value === 'EDUCATIONAL_LEVEL.NO_EDUCATION') {
      this.noSchool = true;
    } else {
      this.noSchool = false;
    }
  }

  validateRoute() {
    if(!this.formGroup.get('personal-information') || this.formGroup.get('personal-information')?.invalid) {
      this.router.navigate(['/app/mgmt/employee/add/personal-information']);
    }
  }

}
