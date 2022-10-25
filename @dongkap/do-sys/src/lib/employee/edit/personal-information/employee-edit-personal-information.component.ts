import { Component, Inject, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, ResponseCode, Pattern, SecurityResourceModel, HttpFactoryService, APIModel, HTTP_SERVICE, OAUTH_INFO, API } from '@dongkap/do-core';
import { BaseFormComponent } from '@dongkap/do-shared';
import { EmployeeService } from '../../services/employee.service';

let emailExist: any;

@Component({
  selector: 'do-employee-edit-personal-information',
  styleUrls: ['./employee-edit-personal-information.component.scss'],
  templateUrl: './employee-edit-personal-information.component.html',
})
export class EmployeeEditPersonalInformationComponent extends BaseFormComponent<any> implements OnInit {

  public patternEmail: string = Pattern.EMAIL;
  public patternPhoneNumber: string = Pattern.PHONE_NUMBER;
  public patternFullname: string = Pattern.FULLNAME;
  public personalInfo: any;

  constructor(
    public injector: Injector,
    private router: Router,
    private employeeService: EmployeeService,
    @Inject(HTTP_SERVICE)private httpBaseService: HttpFactoryService,
    @Inject(OAUTH_INFO)private oauthResource: SecurityResourceModel,
    @Inject(API)private apiPath: APIModel) {
    super(injector,
      {
        employeeName: [],
        nik: [],
        idNumber: [],
        email: [],
        phoneNumber: [],
        address: [],
      });
    this.formGroup.get('email')
    .setAsyncValidators([
      userValidator(this.oauthResource, this.httpBaseService, this.apiPath)
    ]);
    if (!this.employeeService.getEmployeeHeader()) {
      this.router.navigate(['/app/mgmt/employee']);
    }
  }

  ngOnInit(): void {}

  loadDataMenu(): Observable<any> {
    this.loadingForm = true;
    return this.exec('security', 'get-employee-personal-info', {
      employeeId: this.employeeService.getEmployeeHeader()?.id
    }).pipe(map(
      (success: any) => {
        this.loadingForm = false;
        emailExist = success.email;
        this.personalInfo = success?.personalInfo;
        this.formGroup.controls['employeeName'].setValue(success.fullname);
        this.formGroup.controls['nik'].setValue(success.idEmployee);
        this.formGroup.controls['idNumber'].setValue(success.personalInfo?.idNumber);
        this.formGroup.controls['email'].setValue(success.email);
        this.formGroup.controls['phoneNumber'].setValue(success.contact?.phoneNumber);
        this.formGroup.controls['address'].setValue(success.contact?.address);
        this.formGroup.markAsPristine();
      }));
  }

  onReset(): void {
    this.router.navigate(['/app/mgmt/employee']);
  }

  onSubmit(): void {
    const data: any = {
      id: this.employeeService.getEmployeeHeader()?.id,
      idEmployee: this.formGroup.controls['nik'].value,
      fullname: this.formGroup.controls['employeeName'].value,
      email: this.formGroup.controls['email'].value,
      contact: {
        phoneNumber: this.formGroup.controls['phoneNumber'].value,
        address: this.formGroup.controls['address'].value,
      },
      personalInfo: {
        idNumber: this.formGroup.controls['idNumber'].value,
      },
    };
    (super.onSubmit(data, 'security', 'put-employee-personal-info')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.router.navigate(['/app/mgmt/employee']);
        }
      });
  }

}

export function userValidator(
  oauthResource: SecurityResourceModel,
  httpBaseService: HttpFactoryService,
  apiPath: APIModel): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.valueChanges) {
      return of(null);
    } else {
      return control.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => {
          const validatorSubject$: Subject<any> = new Subject<ApiBaseResponse>();
          const httpHeaders: HttpHeaders = new HttpHeaders({
            Authorization: 'Basic ' + btoa(oauthResource['client_id'] + ':' + oauthResource['client_secret']),
            'Content-Type': 'application/json',
          });
          const data: any = {
            user: control.value,
            exist: emailExist,
          };
          let dataValidator: any;
          if (control.value){
            httpBaseService.HTTP_BASE(apiPath['auth']['check-user'], data, httpHeaders).subscribe(
              (response: any) => {
                if (response['respStatusCode'] === ResponseCode.OK_SCR012.toString()) {
                  validatorSubject$.next(null);
                } else {
                  dataValidator = {
                    error: true,
                  };
                  validatorSubject$.next(dataValidator);
                }
              },
              (error: any) => {
                if (!(error instanceof HttpErrorResponse)) {
                  dataValidator = {
                    error: true,
                  };
                } else {
                  if (error.status === 302) {
                    dataValidator = {
                      'not-available': true,
                    };
                  } else {
                    dataValidator = {
                      timeout: true,
                    };
                  }
                }
                validatorSubject$.next(dataValidator);
              });
          }
          return validatorSubject$.asObservable();
        })).pipe(first());
    }
  };
}
