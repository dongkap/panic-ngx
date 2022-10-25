import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatatableFilter, Keyword, Sort, SortProperties } from '../../datatable/models/datatable.model';
import { BaseFormComponent } from './base-form.component';

export abstract class BaseFilterComponent<T> extends BaseFormComponent<T> {

    public formGroupFilter: FormGroup;
    public filters: DatatableFilter[];
    public keyword: Keyword;
    public rows: any[] = [];
    public sort: Sort;
    public sortsDefault: SortProperties[];

    constructor(
        public injector: Injector,
        filtersConfig?: {
            [key: string]: any;
        },
        controlsConfig?: {
            [key: string]: any;
        }) {
        super(injector, controlsConfig);
        if (filtersConfig) {
            this.formGroupFilter = this.formBuilder.group(filtersConfig);
        }
    }

    doFilterAdvanced(keyword: Keyword) {
      this.keyword = keyword;
    }

}
