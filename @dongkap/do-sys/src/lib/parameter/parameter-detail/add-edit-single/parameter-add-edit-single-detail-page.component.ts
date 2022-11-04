import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpBaseModel, ApiBaseResponse, ResponseCode } from '@dongkap/do-core';
import { BaseFormComponent } from '@dongkap/do-shared';
import { ParameterService } from '../../services/parameter.service';
import { ParameterModel, ParameterGroupModel } from '../../models/parameter.model';

@Component({
  selector: 'do-parameter-add-edit-single-detail-page',
  styleUrls: ['./parameter-add-edit-single-detail-page.component.scss'],
  templateUrl: './parameter-add-edit-single-detail-page.component.html',
})
export class ParameterAddEditSingleDetailPageComponent extends BaseFormComponent<any> implements OnInit {

  public action: 'Add' | 'Edit' = 'Add';
  public parameter: ParameterModel = new ParameterModel();
  public parameterGroup: ParameterGroupModel = new ParameterGroupModel();
  public parameterGroupCode: string;
  public parameterCode: string;
  public apiPathParameterI18n: HttpBaseModel;
  public urlBack: string = '/app/sysconf/parameter/detail';

  constructor(
    public injector: Injector,
    private router: Router,
    private parameterService: ParameterService,
    private route: ActivatedRoute) {
    super(injector, {
      parameterCode: [],
      parameterValue: [],
    });
    this.parameterGroupCode = this.route.snapshot.params['parameterGroupCode'];
    this.parameterCode = this.route.snapshot.params['parameterCode'];
    if(this.parameterGroupCode) {
      this.urlBack = this.urlBack + '/' + this.parameterGroupCode;
      if(this.parameterCode) {
        this.action = 'Edit';
        if (this.parameterService.getParameter()) {
          this.putParamToForm();
        } else {
          this.getRequestParam(this.parameterCode);
        }
      }
    } else {
      this.router.navigate(['/app/sysconf/parameter']);
    }
  }

  ngOnInit(): void {}

  onReset(): void {
    this.router.navigate(['/app/sysconf/parameter/detail', this.parameterGroupCode]);
  }

  getRequestParam(parameterCode: string): void {
    this.loadingForm = true;
    this.http.HTTP_AUTH(
      this.api['master']['get-parameter'], null, null, null,
      [parameterCode]).subscribe(
        (success: any) => {
          this.loadingForm = false;
          this.parameterService.setParameter(success);
          this.putParamToForm();
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

  putParamToForm(): void {
    this.parameter = this.parameterService.getParameter();
    this.formGroup.get('parameterCode').setValue(this.parameter.parameterCode);
    this.formGroup.get('parameterCode').disable({emitEvent: true});
    this.formGroup.get('parameterValue').setValue(this.parameter.parameterValue);
  }

  onSubmit() {
    const data: any = this.formGroup.value;
    if (this.action === 'Edit') {
      data.parameterCode = this.parameterCode;
    }
    data.parameterGroupCode = this.parameterGroupCode;
    data.parameterValues = {
      'value': this.formGroup.get('parameterValue').value
    };
    (super.onSubmit(data, 'master', 'post-parameter')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_SCR009.toString()) {
          this.router.navigate(['/app/sysconf/parameter/detail', this.parameterGroupCode]);
        }
      });
  }

}
