import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatatableColumn, DatatableFilter, Keyword } from '@dongkap/do-shared';
import { API, APIModel, HttpBaseModel } from '@dongkap/do-core';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'ngx-exercise-datatable',
  templateUrl: 'exercise-datatable.component.html',
  styleUrls: ['./exercise-datatable.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExerciseDatatableComponent {

  public selectionType: SelectionType = SelectionType.checkbox;
  public reload: boolean = false;
  keyword: Keyword;
  formGroupFilter: FormGroup;
  filters: DatatableFilter[];
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Johnson, Johnson and Partners, LLC CMP DDC' }
  ];
  columns: DatatableColumn[] = [
    { name: 'Name', prop: 'name', width: 450, frozenLeft: true },
    { name: 'Gender', prop: 'gender', width: 250, frozenLeft: true },
    { name: 'Age', prop: 'age', width: 150 },
    { name: 'Company', prop: 'company', width: 250 },
  ];
  apiDatatable: HttpBaseModel;
  dataSelect: any[] = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
  ];
  selected: any = '2022';

  constructor(
    @Inject(API) private api: APIModel,
    private formBuilder: FormBuilder) {
      this.apiDatatable = this.api['sample']['datatable'];
      this.formGroupFilter = this.formBuilder.group({
        name: [],
        gender: [],
        company: [],
      });
      this.filters = [
        { controlName: 'name', type: 'input' },
        { controlName: 'gender', type: 'input' },
        { controlName: 'company', type: 'input' }];
  }

  doFilterAdvanced(keyword: Keyword) {
    this.keyword = keyword;
  }

  onAddGroup(): void {
    console.log('add');
  }

  onViewDetail(data: any): void {
    console.log(data);
  }

  onDeleteGroup(data: any): void {
    console.log(data);
  }
}
