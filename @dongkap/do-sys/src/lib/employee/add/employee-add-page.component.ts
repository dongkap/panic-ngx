import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ApiBaseResponse, ResponseCode } from '@dongkap/do-core';
import { BaseFormComponent, DoWizardService } from '@dongkap/do-shared';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'do-employee-add-page',
  templateUrl: 'employee-add-page.component.html',
  styleUrls: ['./employee-add-page.component.scss'],
})
export class EmployeeAddPageComponent extends BaseFormComponent<any> {

  constructor(
    public injector: Injector,
    private service: DoWizardService,
    private router: Router) {
    super(injector);
  }

  formIsValid(): boolean {
    return this.service.formIsValid();
  }

  onSubmit(data: any){
    const employee: any = {
      fullname: data['personal-information']['name'],
      username: data['personal-information']['email'],
      email: data['personal-information']['email'],
      idEmployee: data['personal-information']['nik'],
      lastEducation: data['education']['educationalLevel']?.value,
      parentId: data['employee-status']['employeeParent']?.value,
      roles: null,
      occupation: {
        code: data['employee-status']['occupation']?.value,
      },
      contact: {
        phoneNumber: data['personal-information']['phoneNumber'],
        address: data['personal-information']['address'],
      },
      personalInfo: {
        idNumber: data['personal-information']['idNumber'],
        genderCode: data['personal-information']['gender'],
        placeOfBirth: data['personal-information']['placeOfBirth'],
        dateOfBirth: data['personal-information']['dateOfBirth'],
        height: data['personal-information']['height'],
        weight: data['personal-information']['weight'],
        bloodType: data['personal-information']['bloodType']?.value,
      },
      education: {
        educationalLevel: data['education']['educationalLevel']?.value,
        schoolName: data['education']['school'],
        startYear: data['education']['startYear'],
        endYear: data['education']['endYear'],
      },
      training: {
        name: data['education']['trainingName'],
        startDate: data['education']['trainingDate']?.start,
        endDate: data['education']['trainingDate']?.end,
      },
    };
    const roles: any[] = [];
    const rolesTmp: any[] = data['employee-status']?.role;
    rolesTmp.forEach(role => {
      roles.push({
        authority: role.value,
      });
    });
    employee['roles'] = roles;
    (super.onSubmit(employee, 'security', 'post-employee') as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.router.navigate(['/app/mgmt/employee']);
        }
      });
  }

}
