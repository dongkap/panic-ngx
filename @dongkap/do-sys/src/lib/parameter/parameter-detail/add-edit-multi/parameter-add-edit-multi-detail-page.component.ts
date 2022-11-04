import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpBaseModel, ApiBaseResponse, ResponseCode, LocaleModel } from '@dongkap/do-core';
import { BaseFormComponent } from '@dongkap/do-shared';
import { ParameterService } from '../../services/parameter.service';
import { ParameterModel, ParameterI18nModel, ParameterGroupModel } from '../../models/parameter.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'do-parameter-add-edit-multi-detail-page',
  styleUrls: ['./parameter-add-edit-multi-detail-page.component.scss'],
  templateUrl: './parameter-add-edit-multi-detail-page.component.html',
})
export class ParameterAddEditMultiDetailPageComponent extends BaseFormComponent<any> implements OnInit {

  public action: 'Add' | 'Edit' = 'Add';
  public parameter: ParameterModel = new ParameterModel();
  public parameterGroup: ParameterGroupModel = new ParameterGroupModel();
  public parameterGroupCode: string;
  public parameterCode: string;
  public allLocales: LocaleModel[] = [];
  public locales: LocaleModel[] = [];
  public localeDefault: LocaleModel = new LocaleModel();
  public isEdit: boolean = false;
  public apiPathParameterI18n: HttpBaseModel;
  public apiPathLocale: HttpBaseModel;
  public urlBack: string = '/app/sysconf/parameter/detail';

  constructor(
    public injector: Injector,
    private router: Router,
    private parameterService: ParameterService,
    private route: ActivatedRoute) {
    super(injector, {
      parameterCode: [],
      'en-US': [],
      'id-ID': [],
      'zh-TW': [],
    });
    this.parameterGroupCode = this.route.snapshot.params['parameterGroupCode'];
    this.parameterCode = this.route.snapshot.params['parameterCode'];
    if(this.parameterGroupCode) {
      this.urlBack = this.urlBack + '/' + this.parameterGroupCode;
      if(this.parameterCode) {
        this.action = 'Edit';
        this.isEdit = true;
        if (this.parameterService.getLocales()) {
          this.splitLocale(this.parameterService.getLocales());
        } else {
          this.getRequestLocale();
        }
        this.getRequestParam();
      }
    } else {
      this.router.navigate(['/app/sysconf/parameter']);
    }
    
  }

  ngOnInit(): void {}

  onReset(): void {
    this.router.navigate(['/app/sysconf/parameter/detail', this.parameterGroupCode]);
  }

  getRequestParam(): void {
    this.parameter = this.parameterService.getParameter();
    this.formGroup.get('parameterCode').setValue(this.parameterCode);
    this.formGroup.get('parameterCode').disable({emitEvent: true});
    this.loadingForm = true;
    this.http.HTTP_AUTH(this.api['master']['get-multi-parameter-i18n'], {
      parameterCode: this.parameterCode,
      }).subscribe(
      (success: ParameterI18nModel[]) => {
        success.forEach(data => {
          this.formGroup.get(data.locale).setValue(data.parameterValue);
        });
        this.loadingForm = false;
      },
      (error: any | ApiBaseResponse) => {
        this.disabled = false;
        this.loadingForm = false;
        if (error instanceof HttpErrorResponse) {
            error = error['error'] as ApiBaseResponse;
        }
        this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
      },
    );
  }

  getRequestLocale(): void {
    this.apiPathLocale = this.api['master']['all-locale'];
    this.http.HTTP_AUTH(this.apiPathLocale).subscribe(response => {
      this.parameterService.setLocales(response);
      this.splitLocale(response);
    });
  }

  splitLocale(values: LocaleModel[]): void {
    this.allLocales = values;
    values.forEach(data => {
      if (data.localeDefault) {
        this.localeDefault = data;
      } else {
        this.locales.push(data);
      }
      this.formGroup.removeControl(data.localeCode);
      this.formGroup.addControl(data.localeCode, new FormControl());
    });
  }

  onSubmit() {
    const data: any = {};
    if (this.isEdit) {
      data.parameterCode = this.parameterCode;
    } else {
      data.parameterCode = this.formGroup.get('parameterCode').value;
    }
    data.parameterGroupCode = this.parameterGroupCode;
    data.parameterValues = {};
    this.allLocales.forEach(value => {
      data.parameterValues[value.localeCode] = this.formGroup.get(value.localeCode).value;
    });
    (super.onSubmit(data, 'master', 'post-parameter-i18n')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_SCR009.toString()) {
          this.router.navigate(['/app/sysconf/parameter/detail', this.parameterGroupCode]);
        }
      });
  }

}
