import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionType } from '@swimlane/ngx-datatable';
import { HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, DatatableColumn } from '@dongkap/do-shared';
import { LocaleService } from '../services/locale.service';

@Component({
  selector: 'do-locale-list-page',
  styleUrls: ['./locale-list-page.component.scss'],
  templateUrl: './locale-list-page.component.html',
})
export class LocaleListPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public selectionType: SelectionType = SelectionType.single;
  public columns: DatatableColumn[] = [
    { name: 'Language Code', prop: 'localeCode', width: 125, frozenLeft: true },
    { name: 'Language', prop: 'identifier', width: 275, frozenLeft: true },
    { name: 'Icon', prop: 'icon', width: 75, frozenLeft: true, type: 'icon' },
    { name: 'System Default Language', prop: 'localeDefault', width: 175, frozenLeft: true },
    { name: 'Created', prop: 'createdBy' },
    { name: 'Created Date', prop: 'createdDate' },
    { name: 'Modified', prop: 'modifiedBy' },
    { name: 'Modified Date', prop: 'modifiedDate' },
  ];
  public expanded: boolean = false;

  constructor(public injector: Injector, private router: Router, private localeService: LocaleService) {
    super(injector, {
      localeCode: [],
      identifier: [],
    });
    this.apiPath = this.api['master']['datatable-locale'];
    this.filters = [
      { controlName: 'localeCode', type: 'input' },
      { controlName: 'identifier', type: 'input' }];
  }

  ngOnInit(): void {
  }

  onAddGroup(): void {
    this.router.navigate(['/app/sysconf/i18n', 'add']);
  }

  onViewDetail(data): void {
    this.localeService.setLocale(data);
    this.router.navigate(['/app/sysconf/i18n', 'edit']);
  }

  onReset(): void {
    this.router.navigate(['/app/sysconf/i18n']);
  }

  back(): boolean {
    this.router.navigate(['/app/sysconf/i18n']);
    return false;
  }

}
