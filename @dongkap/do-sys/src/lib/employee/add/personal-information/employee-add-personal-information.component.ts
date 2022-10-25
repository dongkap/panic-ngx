import { Component, Inject, Injector, OnDestroy, OnInit, } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { DoWizardStep, SelectResponseModel } from '@dongkap/do-shared';
import { API, ApiBaseResponse, APIModel, HttpFactoryService, HTTP_SERVICE, OAUTH_INFO, Pattern, ResponseCode, SecurityResourceModel } from '@dongkap/do-core';

@Component({
  selector: 'do-employee-add-personal-information',
  templateUrl: 'employee-add-personal-information.component.html',
  styleUrls: ['./employee-add-personal-information.component.scss'],
})
export class EmployeeAddPersonalInformationComponent extends DoWizardStep implements OnInit, OnDestroy {

  public formGroupName: string = 'personal-information';
  public patternEmail: string = Pattern.EMAIL;
  public patternPhoneNumber: string = Pattern.PHONE_NUMBER;
  public patternFullname: string = Pattern.FULLNAME;
  public genderData = [];
  public bloodTypeData: SelectResponseModel[] = [{
      label: 'A',
      value: 'A',
      disabled: false,
    }, {
      label: 'B',
      value: 'B',
      disabled: false,
    }, {
      label: 'AB',
      value: 'AB',
      disabled: false,
    }, {
      label: 'O',
      value: 'O',
      disabled: false,
    }];
    private isCheckEmail: boolean = true;

  constructor(
    public injector: Injector,
    @Inject(HTTP_SERVICE)private httpBaseService: HttpFactoryService,
    @Inject(OAUTH_INFO)private oauthResource: SecurityResourceModel,
    @Inject(API)private apiPath: APIModel) {
    super(injector, 'personal-information', {
      name: [{
        value: null,
        disabled: false,
      }, Validators.required],
      nik: [{
        value: null,
        disabled: false,
      }, Validators.required],
      idNumber: [{
        value: null,
        disabled: false,
      }, Validators.required],
      email: [{
        value: null,
        disabled: false,
      }, Validators.required],
      phoneNumber: [{
        value: null,
        disabled: false,
      }, Validators.required],
      address: [{
        value: null,
        disabled: false,
      }, Validators.required],
      placeOfBirth: [{
        value: null,
        disabled: false,
      }, Validators.required],
      dateOfBirth: [{
        value: null,
        disabled: false,
      }, Validators.required],
      gender: [{
        value: null,
        disabled: false,
      }],
      height: [{
        value: null,
        disabled: false,
      }],
      weight: [{
        value: null,
        disabled: false,
      }],
      bloodType: [{
        value: null,
        disabled: false,
      }],
    });
    this.formGroup.get('personal-information').get('email')
    .setAsyncValidators([userValidator(this.oauthResource, this.httpBaseService, this.apiPath)]);
  }

  ngOnInit(): void {
    this.formGroup.get('personal-information').get('gender').setValue('GENDER.MALE');
    this.loadingForm = true;
    this.http.HTTP_AUTH(this.api['master']['radio-parameter'], {
      keyword : {
        parameterGroupCode: 'GENDER',
      },
    }).pipe(takeUntil(this.destroy$), map((response: any) => {
        this.genderData = response;
      }), catchError(() => of([]))).subscribe(() => {
        this.loadingForm = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  onKeyDownEmail(event: KeyboardEvent){
    if (event.key) {
      if (!event.key.match(/[!#$%^&*()?":{}|<>\[\];\\=~`]/g)) {
        if (([
          'TAB',
          'ESCAPE',
          'ENTER',
          'HOME',
          'END',
          'ARROWLEFT',
          'ARROWRIGHT',
          'ARROWUP',
          'ARROWDOWN',
          'PAGEUP',
          'PAGEDOWN'].indexOf(event.key.toUpperCase()) === -1) &&
        !event.ctrlKey && !event.metaKey && !event.altKey) {
          this.isCheckEmail = true;
        }
      }
    }
  }

  validateRoute() {}

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
