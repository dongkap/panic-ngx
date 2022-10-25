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

@Component({
  selector: 'do-parameter-add-edit-detail-page',
  styleUrls: ['./parameter-add-edit-detail-page.component.scss'],
  templateUrl: './parameter-add-edit-detail-page.component.html',
})
export class ParameterAddEditDetailPageComponent extends BaseFormComponent<any> implements OnInit {

  public action: 'Add' | 'Edit' = 'Add';
  public parameter: ParameterModel = new ParameterModel();
  public parameterGroup: ParameterGroupModel = new ParameterGroupModel();
  public allLocales: LocaleModel[] = [];
  public locales: LocaleModel[] = [];
  public localeDefault: LocaleModel = new LocaleModel();
  public isEdit: boolean = false;
  public apiPathParameterI18n: HttpBaseModel;
  public apiPathLocale: HttpBaseModel;

  constructor(
    public injector: Injector,
    private router: Router,
    private parameterService: ParameterService,
    private route: ActivatedRoute) {
    super(injector, {
      parameterCode: [],
      'en-US': [],
      'id-ID': [],
    });
    if (this.parameterService.getParameterGroup()) {
      this.parameterGroup = this.parameterService.getParameterGroup();
      if ((this.route.snapshot.params['action'] === 'edit')) {
        if (this.parameterService.getParameter()) {
          this.action = 'Edit';
          this.isEdit = true;
          this.parameter = this.parameterService.getParameter();
        } else {
          this.router.navigate(['/app/sysconf/parameter']);
        }
      }
      if (!this.parameterService.getLocales()) {
        this.apiPathLocale = this.api['master']['all-locale'];
        this.http.HTTP_AUTH(this.apiPathLocale).subscribe(response => {
          this.parameterService.setLocales(response);
          this.splitLocale(response);
        });
      } else {
        this.splitLocale(this.parameterService.getLocales());
      }
      if (this.isEdit) {
        this.formGroup.get('parameterCode').setValue(this.parameter.parameterCode);
        this.formGroup.get('parameterCode').disable({emitEvent: true});
        this.apiPathParameterI18n = this.api['master']['all-parameter-i18n'];
        this.loadingForm = true;
        this.http.HTTP_AUTH(this.apiPathParameterI18n, {
          parameterCode: this.parameter.parameterCode,
        }).subscribe((response: ParameterI18nModel[]) => {
          response.forEach(data => {
            this.formGroup.get(data.locale).setValue(data.parameterValue);
            this.loadingForm = false;
          });
        });
      }
    } else {
      this.router.navigate(['/app/sysconf/parameter']);
    }
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

  ngOnInit(): void {}

  onReset(): void {
    this.router.navigate(['/app/sysconf/parameter/detail']);
  }

  onSubmit() {
    const data: any = this.formGroup.value;
    if (this.isEdit) {
      data.parameterCode = this.parameter.parameterCode;
    }
    data.parameterGroupCode = this.parameterGroup.parameterGroupCode;
    data.parameterValues = {};
    this.allLocales.forEach(value => {
      data.parameterValues[value.localeCode] = this.formGroup.get(value.localeCode).value;
    });
    (super.onSubmit(data, 'master', 'post-parameter-i18n')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_SCR009.toString()) {
          this.router.navigate(['/app/sysconf/parameter/detail']);
        }
      });
  }

}
