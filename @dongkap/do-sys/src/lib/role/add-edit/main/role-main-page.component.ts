import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TreeMode } from 'tree-ngx';
import { BaseFormComponent } from '@dongkap/do-shared';

@Component({
  selector: 'do-role-main-page',
  styleUrls: ['./role-main-page.component.scss'],
  templateUrl: './role-main-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RoleMainPageComponent extends BaseFormComponent<any> implements OnInit {

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input() public authority: string;
  public nodeItems: any[] = [];
  public options: any = {
    mode: TreeMode.MultiSelect,
    checkboxes: true,
    alwaysEmitSelected: true,
  };
  public title: string = null;
  private data: any[] = [];

  constructor(
    public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  loadDataMenu(mainData?: any[]): Observable<any> {
    if (mainData.length > 0) {
      return of(() => {
        this.nodeItems = [];
        this.nodeItems = [...this.nodeItems, ...mainData];
      });
    } else {
      return this.http.HTTP_AUTH(
        this.api['security']['get-function-menus'], null, null, null,
        ['main', this.authority]).pipe(map((response: any) => {
          this.nodeItems = [];
          this.nodeItems = [...this.nodeItems, ...response];
          this.data = [];
          response.forEach(val => {
            if (val?.children) {
              val?.children.forEach(child => {
                if (child.selected) {
                  this.data = [...this.data, child.item];
                }
              });
            } else {
              if (val.selected) {
                this.data = [...this.data, val.item];
              }
            }
          });
          return this.data;
        }));
    }
  }

  initDataMenu(mainData?: any[]): Observable<any> {
    if (mainData.length > 0) {
      return of(() => {
        this.nodeItems = [];
        this.nodeItems = [...this.nodeItems, ...mainData];
      });
    } else {
      return this.http.HTTP_AUTH(
        this.api['security']['get-tree-menus'], null, null, null,
        ['main']).pipe(map((response: any) => {
          this.nodeItems = [];
          this.nodeItems = [...this.nodeItems, ...response];
        }));
    }
  }

  select(datas: any[]) {
    this.onSelect.emit(datas);
  }

}
