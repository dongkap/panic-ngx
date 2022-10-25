import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBaseModel } from '@dongkap/do-core';
import { BaseFilterComponent, DatatableColumn } from '@dongkap/do-shared';
import { SelectionType } from '@swimlane/ngx-datatable';
import { JobPlacementService } from '../services/job-placement.service';

@Component({
  selector: 'do-job-placement-list-page',
  styleUrls: ['./job-placement-list-page.component.scss'],
  templateUrl: './job-placement-list-page.component.html',
})
export class JobPlacementListPageComponent extends BaseFilterComponent<any> implements OnInit {

  public apiPath: HttpBaseModel;
  public columns: DatatableColumn[] = [
    { name: 'Business Partner', prop: 'bpName', frozenLeft: true, sortable: true },
    { name: 'Total Assignment', prop: 'totalAssignment', width: 55, frozenLeft: true },
  ];
  public selectionType: SelectionType = SelectionType.single;

  constructor(
    public injector: Injector,
    private router: Router,
    private jobPlacementService: JobPlacementService) {
    super(injector, {
      bpName: [],
    });
    this.sort = {
      asc: ['bpName']
    };
    this.sortsDefault = [
      { prop: 'bpName', dir: 'asc' }
    ];
    this.filters = [{ controlName: 'bpName', type: 'input' }];
    this.apiPath = this.api['activity']['datatable-assignment-group'];
  }

  ngOnInit(): void {
  }

  onViewDetail(data): void {
    this.jobPlacementService.setAssignmentGroup(data);
    this.router.navigate(['/app/mgmt/job-placement', 'edit']);
  }

}
