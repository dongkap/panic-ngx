import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { TableColumn } from '@swimlane/ngx-datatable';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { HttpBaseModel, ApiBaseResponse } from '@dongkap/do-core';
import { BaseFilterComponent, Sort } from '@dongkap/do-shared';
import { ParameterService } from '../../services/parameter.service';

@Component({
  selector: 'do-parameter-list-group-page',
  styleUrls: ['./parameter-list-group-page.component.scss'],
  templateUrl: './parameter-list-group-page.component.html',
})
export class ParameterListGroupPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public apiPathLocale: HttpBaseModel;
  public apiPathDelete: HttpBaseModel;
  public columns: TableColumn[] = [
    { name: 'Parameter Group Code', prop: 'parameterGroupCode', width: 220, frozenLeft: true },
    { name: 'Parameter Group Name', prop: 'parameterGroupName', width: 200, frozenLeft: true },
  ];
  public reload: boolean = false;
  private parameterGroupCodes: any[];

  constructor(
    public injector: Injector,
    private router: Router,
    private parameterService: ParameterService,
    private dialogService: NbDialogService) {
    super(injector, {
      parameterGroupCode: [],
      parameterGroupName: [],
    });
    this.sort = {
      asc: ['parameterGroupName']
    };
    this.filters = [
      { controlName: 'parameterGroupCode', type: 'input' },
      { controlName: 'parameterGroupName', type: 'input' }];
    this.apiPath = this.api['master']['datatable-parameter-group'];
    this.apiPathLocale = this.api['master']['all-locale'];
    this.apiPathDelete = this.api['master']['delete-parameter-group'];
  }

  ngOnInit(): void {
    this.http.HTTP_AUTH(this.apiPathLocale).subscribe(value => {
      this.parameterService.setLocales(value);
    });
  }

  onAddGroup(): void {
    this.router.navigate(['/app/sysconf/parameter/group', 'add']);
  }

  onViewDetail(data): void {
    this.parameterService.setParameterGroup({
      parameterGroupCode: data['parameterGroupCode'],
      parameterGroupName: data['parameterGroupName'],
    });
    this.router.navigate(['/app/sysconf/parameter/detail']);
  }

  onDeleteGroup(data, dialog: TemplateRef<any>): void {
    this.reload = false;
    this.parameterGroupCodes = [];
    data.forEach(value => {
      this.parameterGroupCodes.push(value.parameterGroupCode);
    });
    this.dialogService.open(
      dialog,
      { context: 'alert.delete' });
  }

  onDelete(ref: NbDialogRef<any>): void {
    this.disabled = true;
    this.http.HTTP_AUTH(this.apiPathDelete, this.parameterGroupCodes)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (success: ApiBaseResponse) => {
          ref.close();
          this.disabled = false;
          this.reload = true;
          this.toastr.showI18n(success.respStatusMessage[success.respStatusCode], true);
        },
        (error: ApiBaseResponse) => {
          this.disabled = false;
          this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
        },
    );
  }

}
