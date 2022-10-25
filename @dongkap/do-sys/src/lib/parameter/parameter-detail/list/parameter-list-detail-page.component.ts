import { Component, Injector, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { TableColumn, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent } from '@dongkap/do-shared';
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
  public expanded: boolean = false;

  constructor(public injector: Injector, private router: Router, private parameterService: ParameterService) {
    super(injector, {
      parameterCode: [],
    }, {
      parameterGroupCode: [],
      parameterGroupName: [],
    });
    this.sort = {
      asc: ['parameterCode']
    };
    if (this.parameterService.getParameterGroup()) {
      this.apiPath = this.api['master']['datatable-parameter'];
      this.filters = [{ controlName: 'parameterCode', type: 'input' }];
      this.parameterGroup = this.parameterService.getParameterGroup();
      this.keyword = {
        parameterGroupCode: this.parameterGroup.parameterGroupCode,
      };
      this.formGroup.get('parameterGroupCode').setValue(this.parameterGroup.parameterGroupCode);
      this.formGroup.get('parameterGroupName').setValue(this.parameterGroup.parameterGroupName);
    } else {
      this.router.navigate(['/app/sysconf/parameter']);
    }
  }

  ngOnInit(): void {
  }

  onAddGroup(event): void {
    this.parameterService.setParameter(null);
    this.router.navigate(['/app/sysconf/parameter/detail', 'add']);
  }

  onViewDetail(data): void {
    this.parameterService.setParameter({
      parameterGroupCode: data['parameterGroupCode'],
      parameterGroupName: data['parameterGroupName'],
      parameterCode: data['parameterCode'],
    });
    this.router.navigate(['/app/sysconf/parameter/detail', 'edit']);
  }

  onReset(): void {
    this.router.navigate(['/app/sysconf/parameter']);
  }

  onSubmit(): void {
    super.onSubmit(this.formGroup.value, 'master', 'post-parameter-group');
  }

}
