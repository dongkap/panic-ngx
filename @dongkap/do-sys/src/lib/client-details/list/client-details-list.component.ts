import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { API, APIModel, HttpBaseModel, HttpFactoryService, HTTP_SERVICE } from '@dongkap/do-core';
import { DatatableColumn, Keyword } from '@dongkap/do-shared';
import { ClientDetailsService } from '../services/client-details.service';

@Component({
  selector: 'do-client-details-list',
  templateUrl: 'client-details-list.component.html',
  styleUrls: ['client-details-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailsListComponent implements OnInit {

  public loadingIndicator: boolean = true;
  public keyword: Keyword;
  public columnMode: ColumnMode = ColumnMode.force;
  public apiPath: HttpBaseModel;
  public columns: DatatableColumn[] = [
    { name: 'Client ID', prop: 'client_id', width: 125, frozenLeft: true },
    { name: 'Access Token Validity', prop: 'access_token_validity', width: 100, frozenLeft: true },
    { name: 'Refresh Token Validity', prop: 'refresh_token_validity', width: 100, frozenLeft: true },
    { name: 'Resource Ids', prop: 'resource_ids', width: 225 },
  ];
  public rows: any[] = [];
  public count: number = 0;
  public rowHeight: number | 'auto' | ((row?: any) => number) = 'auto';

  constructor(
    private router: Router,
    private cdref: ChangeDetectorRef,
    private clientDetailsService: ClientDetailsService,
    @Inject(HTTP_SERVICE)private http: HttpFactoryService,
    @Inject(API)private api: APIModel) {
      this.apiPath = this.api['security']['datatable-client-details'];
  }

  ngOnInit(): void {
    this.getRequest().subscribe(rows => {
      this.rows = rows;
      this.cdref.detectChanges();
    });
  }

  private getRequest(): Observable<any[]> {
    const body: any = {
      keyword : this.keyword,
    };
    this.loadingIndicator = true;
    return this.http.HTTP_AUTH(this.apiPath, body)
      .pipe(
        map((response: any) => {
          this.count = Number(response.totalRecord);
          this.loadingIndicator = false;
          return (response['data'] as any[]);
        }),
        catchError(() => {
          this.loadingIndicator = false;
          this.count = 0;
          return of([]);
        }));
  }

  onClientDetails(event: any) {
    if (event.type === 'click') {
      this.clientDetailsService.setClientDetails(event.row);
      this.router.navigate(['/app/mgmt/client-ids', 'edit']);
    }
  }

}
