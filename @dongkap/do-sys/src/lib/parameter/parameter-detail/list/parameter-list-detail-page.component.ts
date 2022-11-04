import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TableColumn, SelectionType } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiBaseResponse, HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, CheckboxModel } from '@dongkap/do-shared';
import { ParameterService } from '../../services/parameter.service';
import { ParameterGroupModel } from '../../models/parameter.model';

@Component({
  selector: 'do-parameter-list-detail-page',
  styleUrls: ['./parameter-list-detail-page.component.scss'],
  templateUrl: './parameter-list-detail-page.component.html',
})
export class ParameterListDetailPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public selectionType: SelectionType = SelectionType.single;
  public columns: TableColumn[] = [
    { name: 'Parameter Code', prop: 'parameterCode', width: 350, frozenLeft: true },
    { name: 'Created', prop: 'createdBy' },
    { name: 'Created Date', prop: 'createdDate' },
    { name: 'Modified', prop: 'modifiedBy' },
    { name: 'Modified Date', prop: 'modifiedDate' },
  ];
  public parameterGroup: ParameterGroupModel = new ParameterGroupModel();
  public parameterGroupCode: string;
  public expanded: boolean = false;
  public dataType: any[] = [
    {
      id: 'parameterGroupType',
    },
  ];

  constructor(public injector: Injector, private router: Router, private parameterService: ParameterService, private route: ActivatedRoute) {
    super(injector, {
      parameterCode: [],
    }, {
      parameterGroupCode: [],
      parameterGroupName: [],
      parameterGroupType: [],
    });
    this.sort = {
      asc: ['parameterCode']
    };
    this.parameterGroupCode = this.route.snapshot.params['parameterGroupCode'];
    if (this.parameterGroupCode) {
      this.apiPath = this.api['master']['datatable-parameter'];
      this.filters = [{ controlName: 'parameterCode', type: 'input' }];
      this.keyword = {
        parameterGroupCode: this.parameterGroupCode,
      };
      if(this.parameterService.getParameterGroup()) {
        this.putParamToForm();
      } else {
        this.getRequestParamGroup(this.parameterGroupCode);
      }
    } else {
      this.router.navigate(['/app/sysconf/parameter']);
    }
  }

  ngOnInit(): void {
  }

  getRequestParamGroup(parameterGroupCode: string): void {
    this.loadingForm = true;
    this.http.HTTP_AUTH(
      this.api['master']['get-parameter-group'], null, null, null,
      [parameterGroupCode]).subscribe(
        (success: any) => {
          this.loadingForm = false;
          this.parameterService.setParameterGroup(success);
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
    this.parameterGroup = this.parameterService.getParameterGroup();
    const parameterGroupType: CheckboxModel[] = [
      {
        id: 'parameterGroupType',
        selected: (this.parameterGroup.parameterGroupType === 'multi' ? true : false),
      },
    ]
    this.formGroup.get('parameterGroupCode').setValue(this.parameterGroup.parameterGroupCode);
    this.formGroup.get('parameterGroupName').setValue(this.parameterGroup.parameterGroupName);
    this.formGroup.get('parameterGroupType').setValue(parameterGroupType);
    this.formGroup.get('parameterGroupType').disable();
  }

  onAddGroup(event): void {
    this.parameterService.setParameter(null);
    if(this.parameterGroup?.parameterGroupType === 'multi') {
      this.router.navigate(['/app/sysconf/parameter/detail/i18n', this.parameterGroupCode]);
    } else {
      this.router.navigate(['/app/sysconf/parameter/detail/value', this.parameterGroupCode]);
    }
  }

  onViewDetail(data): void {
    this.parameterService.setParameter({
      parameterGroupCode: data['parameterGroupCode'],
      parameterGroupName: data['parameterGroupName'],
      parameterGroupType: data['parameterGroupType'],
      parameterCode: data['parameterCode'],
      parameterValue: data['parameterValue'],
    });
    if(this.parameterGroup?.parameterGroupType === 'multi') {
      this.router.navigate(['/app/sysconf/parameter/detail/i18n', this.parameterGroupCode, data['parameterCode']]);
    } else {
      this.router.navigate(['/app/sysconf/parameter/detail/value', this.parameterGroupCode, data['parameterCode']]);
    }
  }

  onReset(): void {
    this.router.navigate(['/app/sysconf/parameter']);
  }

  onSubmit(): void {
    super.onSubmit(this.formGroup.value, 'master', 'post-parameter-group');
  }

}
