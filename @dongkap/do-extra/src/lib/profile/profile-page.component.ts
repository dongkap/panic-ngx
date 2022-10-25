import { Component, Injector, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  PROFILE_INDEXED_DB,
  ResponseCode,
  Pattern,
  USER_SERVICE,
  UserService,
} from '@dongkap/do-core';
import { HttpBaseModel } from '@dongkap/do-core';
import { ApiBaseResponse } from '@dongkap/do-core';
import { IndexedDBFactoryService } from '@dongkap/do-core';
import { BaseFormComponent, SelectParamModel, SelectResponseModel } from '@dongkap/do-shared';
import { AuthIndexedDBService } from '@dongkap/do-auth';
import { ContactUserModel, PersonalInfoModel, ProfileModel } from './profile.model';

@Component({
  selector: 'do-profile-page',
  styleUrls: ['./profile-page.component.scss'],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent extends BaseFormComponent<any> implements OnInit {

  public formGroupImage: FormGroup;
  public uploadFinished: boolean;
  public patternEmail: string = Pattern.EMAIL;
  public patternPhoneNumber: string = Pattern.PHONE_NUMBER;
  public minLength: number = 5;
  public disabledUpload: boolean = false;
  public provider: string = 'local';

  public apiSelectGender: HttpBaseModel;
  public paramSelectGender: SelectParamModel[];

  public apiSelectCountry: HttpBaseModel;

  public apiSelectProvince: HttpBaseModel;
  public paramSelectProvince: SelectParamModel[];

  public apiSelectCity: HttpBaseModel;
  public paramSelectCity: SelectParamModel[];

  public apiSelectDistrict: HttpBaseModel;
  public paramSelectDistrict: SelectParamModel[];

  public apiSelectSubDistrict: HttpBaseModel;
  public paramSelectSubDistrict: SelectParamModel[];

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

  constructor(
    public injector: Injector,
    @Inject(USER_SERVICE) private userService: UserService,
    @Inject(PROFILE_INDEXED_DB) private profileIndexedDB: IndexedDBFactoryService,
    private authIndexedDB: AuthIndexedDBService) {
    super(injector,
      {
        username: [{
          value: null,
          disabled: true,
        }],
        name: [],
        idNumber: [],
        placeOfBirth: [],
        dateOfBirth: [],
        gender: [],
        height: [],
        weight: [],
        bloodType: [],
        email: [],
        phoneNumber: [],
        address: [null, [Validators.minLength(5)]],
        country: [],
        province: [],
        city: [],
        district: [],
        subDistrict: [],
      });
    this.formGroupImage = this.formBuilder.group({
      image: [],
    });
    this.apiSelectGender = this.api['master']['select-parameter'];
    this.apiSelectCountry = this.api['master']['select-country'];
    this.apiSelectProvince = this.api['master']['select-province'];
    this.apiSelectCity = this.api['master']['select-city'];
    this.apiSelectDistrict = this.api['master']['select-district'];
    this.apiSelectSubDistrict = this.api['master']['select-subdistrict'];
    this.authIndexedDB.getEnc('provider').then((value: string) => {
      if (value !== 'local') {
        this.provider = value;
        this.formGroup.controls['email'].disable();
      }
    });
  }

  ngOnInit(): void {
    this.onInit('profile', 'get-profile');
    this.profileIndexedDB.get('image-base64').then((image: any) => {
      this.formGroupImage.get('image').setValue(image);
      this.formGroupImage.markAsPending();
    });
    this.paramSelectGender = [{
      key: 'parameterGroupCode',
      value: 'GENDER',
    }];
    this.paramSelectProvince = [{
      key: 'country',
      value: 'undefined',
    }];
    this.paramSelectCity = [{
      key: 'province',
      value: 'undefined',
    }];
    this.paramSelectDistrict = [{
      key: 'city',
      value: 'undefined',
    }];
    this.paramSelectSubDistrict = [{
      key: 'district',
      value: 'undefined',
    }];
  }

  onInit(serviceName: string, apiName: string): void {
    this.loadingForm = true;
    this.exec(serviceName, apiName)
      .subscribe(
        (success: ProfileModel) => {
          this.loadingForm = false;
          this.formGroup.controls['name'].setValue(success.name);
          this.formGroup.controls['username'].setValue(success.username);
          this.formGroup.controls['email'].setValue(success.email);
          if (success?.personalInfo) {
            this.formGroup.controls['idNumber'].setValue(success?.personalInfo?.idNumber);
            if (success?.personalInfo?.genderCode) {
              this.formGroup.controls['gender'].setValue({
                label: success?.personalInfo.genderValue,
                value: success?.personalInfo.genderCode
              });
            }
            this.formGroup.controls['placeOfBirth'].setValue(success?.personalInfo?.placeOfBirth);
            if (success?.personalInfo?.dateOfBirth) {
              this.formGroup.controls['dateOfBirth'].setValue(success?.personalInfo?.dateOfBirth);
            }
            this.formGroup.controls['height'].setValue(success?.personalInfo?.height);
            this.formGroup.controls['weight'].setValue(success?.personalInfo?.weight);
            this.formGroup.controls['bloodType'].setValue({
              value: success?.personalInfo?.bloodType,
              label: success?.personalInfo?.bloodType,
            });
          }
          if (success?.contact) {
            if (success?.contact?.address) {
              this.formGroup.controls['address'].setValue(success?.contact?.address);
            }
            if (success?.contact?.phoneNumber) {
              this.formGroup.controls['phoneNumber'].setValue(success?.contact?.phoneNumber);
            }
            if (success?.contact?.country) {
              this.formGroup.controls['country'].setValue({
                label: success?.contact?.country,
                value: success?.contact?.countryCode
              });
              this.paramSelectProvince = [
                {
                  key: 'country',
                  value: success?.contact?.countryCode,
                },
              ];
            }
            if (success?.contact?.province) {
              this.formGroup.controls['province'].setValue({
                label: success?.contact?.province,
                value: success?.contact?.provinceCode
              });
              this.paramSelectCity = [
                {
                  key: 'province',
                  value: success?.contact?.provinceCode,
                },
              ];
            }
            if (success?.contact?.city) {
              this.formGroup.controls['city'].setValue({
                label: success?.contact?.city,
                value: success?.contact?.cityCode
              });
              this.paramSelectDistrict = [
                {
                  key: 'city',
                  value: success?.contact?.cityCode,
                },
              ];
            }
            if (success?.contact?.district) {
              this.formGroup.controls['district'].setValue({
                label: success?.contact?.district,
                value: success?.contact?.districtCode
              });
              this.paramSelectSubDistrict = [
                {
                  key: 'district',
                  value: success?.contact?.districtCode,
                },
              ];
            }
            if (success?.contact?.subDistrict) {
              this.formGroup.controls['subDistrict'].setValue({
                label: success?.contact?.subDistrict,
                value: success?.contact?.subDistrictCode
              });
            }
          }
          this.authIndexedDB.getEnc('provider').then((value: string) => {
            if (value !== 'local') {
              this.provider = value;
              this.formGroup.controls['email'].disable();
            }
          });
          this.formGroup.markAsPristine();
        },
        (error: any | ApiBaseResponse) => {
          this.loadingForm = true;
          if (error instanceof HttpErrorResponse) {
              error = error['error'] as ApiBaseResponse;
          }
          this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
        });
  }

  onSelectCountry(select: any): void {
    this.paramSelectProvince = [
      {
        key: 'country',
        value: select ? select.value : 'undefined',
      },
    ];
    this.onClearProvince();
  }
  onSelectProvince(select: any): void {
    this.paramSelectCity = [
      {
        key: 'province',
        value: select ? select.value : 'undefined',
      },
    ];
    this.onClearProvince();
  }
  onSelectCity(select: any): void {
    this.paramSelectDistrict = [
      {
        key: 'city',
        value: select ? select.value : 'undefined',
      },
    ];
    this.onClearCity();
  }
  onSelectDistrict(select: any): void {
    this.paramSelectSubDistrict = [
      {
        key: 'district',
        value: select ? select.value : 'undefined',
      },
    ];
    this.onClearDistrict();
  }

  onClearCountry(): void {
    this.formGroup.patchValue({
      province: null,
      city: null,
      district: null,
      subDistrict: null,
    });
  }
  onClearProvince(): void {
    this.formGroup.patchValue({
      city: null,
      district: null,
      subDistrict: null,
    });
  }
  onClearCity(): void {
    this.formGroup.patchValue({
      district: null,
      subDistrict: null,
    });
  }
  onClearDistrict(): void {
    this.formGroup.patchValue({
      subDistrict: null,
    });
  }

  uploadImage() {
    const file: any = this.formGroupImage.get('image').value;
    const data: FormData = new FormData();
    data.append('photo', file);
    this.formGroupImage.get('image').disable();
    this.initProgress();
    this.setProgress(65);
    this.exec('profile', 'upload-photo-profile', data).subscribe(
        (success: ApiBaseResponse) => {
          this.setProgress(95);
          this.userService.updatePhoto(success.respStatusMessage['checksum']);
          this.uploadFinished = true;
          this.formGroupImage.markAsPristine();
          this.toastr.showI18n(success.respStatusMessage[success.respStatusCode], true, null, 'success');
          this.doneProgress();
        },
        (error: ApiBaseResponse) => {
          this.formGroupImage.get('image').enable();
          this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
          this.doneProgress();
        },
    );
  }

  valueSelect(prop: string): string {
    if (this.formGroup.get(prop).value) {
      if (this.formGroup.get(prop).value.label) {
        return this.formGroup.get(prop).value.label;
      } else {
        return this.formGroup.get(prop).value;
      }
    } else {
      return null;
    }
  }

  valueSelectNonLabel(prop: string): string {
    if (this.formGroup.get(prop).value) {
      if (this.formGroup.get(prop).value.value) {
        return this.formGroup.get(prop).value.value;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  onSubmit() {
    const contact: ContactUserModel = {
      phoneNumber: this.formGroup.get('phoneNumber').value,
      address: this.formGroup.get('address').value,
      country: this.valueSelect('country'),
      countryCode: this.valueSelectNonLabel('country'),
      province: this.valueSelect('province'),
      provinceCode: this.valueSelectNonLabel('province'),
      city: this.valueSelect('city'),
      cityCode: this.valueSelectNonLabel('city'),
      district: this.valueSelect('district'),
      districtCode: this.valueSelectNonLabel('district'),
      subDistrict: this.valueSelect('subDistrict'),
      subDistrictCode: this.valueSelectNonLabel('subDistrict'),
    };
    const personalInfo: PersonalInfoModel = {
      idNumber: this.formGroup.get('idNumber').value,
      placeOfBirth: this.formGroup.get('placeOfBirth').value,
      dateOfBirth: this.formGroup.get('dateOfBirth').value,
      genderCode: this.valueSelectNonLabel('gender'),
      genderValue: this.valueSelect('gender'),
      height: this.formGroup.get('height').value,
      weight: this.formGroup.get('weight').value,
      bloodType: this.formGroup.get('bloodType').value?.value,
    };
    const data: any = {
      name: this.formGroup.get('name').value,
      contact,
      personalInfo,
    };
    if (this.provider === 'local') {
      data['email'] = this.formGroup.get('email').value;
    }
    (super.onSubmit(data, 'profile', 'change-profile') as Observable<ApiBaseResponse>)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: ApiBaseResponse) => {
              if (response) {
                switch (response.respStatusCode) {
                  case ResponseCode.ERR_SCR0008.toString():
                    this.formGroup.controls['email'].setErrors({
                      email: true,
                    });
                    break;
                  case ResponseCode.ERR_SCR0007A.toString():
                    this.formGroup.controls['phoneNumber'].setErrors({
                      'error.pattern.phoneNumber': true,
                    });
                    break;
                  case ResponseCode.OK_SCR004.toString():
                    this.userService.updateName(this.formGroup.get('name').value);
                    break;
                  default:
                    break;
                }
              }
            });
  }

}
