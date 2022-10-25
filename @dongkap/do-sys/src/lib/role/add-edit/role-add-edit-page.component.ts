import { Component, Injector, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';;
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiBaseResponse, SystemAuthority, HttpBaseModel, ResponseCode, RoleModel } from '@dongkap/do-core';
import { BaseFormComponent, CheckboxModel } from '@dongkap/do-shared';
import { RoleService } from '../services/role.service';
import { RoleMainPageComponent } from './main/role-main-page.component';
import { RoleExtraPageComponent } from './extra/role-extra-page.component';

@Component({
  selector: 'do-language-add-edit-page',
  styleUrls: ['./role-add-edit-page.component.scss'],
  templateUrl: './role-add-edit-page.component.html',
})
export class RoleAddEditPageComponent extends BaseFormComponent<any> implements OnInit {

  public apiSelectGroup: HttpBaseModel;
  public action: 'Add' | 'Edit' = 'Add';
  public dataDefault: CheckboxModel[] = [
    {
      selected: false,
    },
  ];
  public loading: boolean = false;
  public tab: string = 'main';
  public title: string;
  private mainData: any[] = [];
  private extraData: any[] = [];
  @ViewChild('mainRole', { static: true }) mainMenu: RoleMainPageComponent;
  @ViewChild('extraRole', { static: true }) extraMenu: RoleExtraPageComponent;

  constructor(
    public injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RoleService) {
    super(injector,
      {
        authority: [],
        level: [],
        description: [],
        group: [],
        mainMenus: [],
        extraMenus: [],
      });
    this.apiSelectGroup = this.api['security']['select-group'];
    if ((this.route.snapshot.params['action'] === 'edit')) {
      this.action = 'Edit';
      if (!this.roleService.getRole()) {
        this.router.navigate(['/app/mgmt/role']);
      }
    }
    if (this.roleService.getRole() && (this.route.snapshot.params['action'] === 'edit')) {
      this.title = this.roleService.getRole().description;
      this.formGroup.get('authority').setValue(this.roleService.getRole().authority);
      this.formGroup.get('authority').disable();
      this.formGroup.get('level').setValue(this.roleService.getRole().level);
      this.formGroup.get('description').setValue(this.roleService.getRole().description);
      this.formGroup.get('group').setValue({
        value: this.roleService.getRole().group?.code,
        label: this.roleService.getRole().group?.name
      });
    }
  }

  ngOnInit(): void {}

  onReset(): void {
    this.router.navigate(['/app/mgmt/role']);
  }

  onSubmit(): void {
    const group: SystemAuthority = new SystemAuthority();
    if (this.formGroup.get('group').value['value']) {
      group.code = this.formGroup.get('group').value['value'];
      group.name = this.formGroup.get('group').value['label'];
    }
    const role: RoleModel = {
      authority: this.formGroup.get('authority').value,
      level: this.formGroup.get('level').value,
      description: this.formGroup.get('description').value,
      group,
    };
    const main: any[] = [];
    this.mainData.forEach(val => {
      main.push(val['id']);
      if (val['parentMenu']['id']) {
        if (!main.includes(val['parentMenu']['id'])) {
          main.push(val['parentMenu']['id']);
        }
      }
    });
    const extra: any[] = [];
    this.extraData.forEach(val => {
      extra.push(val['id']);
      if (val['parentMenu']['id']) {
        if (!extra.includes(val['parentMenu']['id'])) {
          extra.push(val['parentMenu']['id']);
        }
      }
    });
    const data: any = {
      role,
      main,
      extra
    };
    (super.onSubmit(data, 'security', 'post-function-role')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.router.navigate(['/app/mgmt/role']);
        }
      });
  }

  toggleLoadingAnimation(event: any) {
    this.tab = event.tabId;
    this.loading = true;
    if (this.tab === 'main') {
      if (this.roleService.getRole() && this.action === 'Edit') {
        this.mainMenu.loadDataMenu(this.mainData)
          .pipe(takeUntil(this.destroy$))
          .subscribe((value: any[]) => {
            this.loading = false;
            if (this.mainData.length === 0) {
              this.mainData = value;
              this.formGroup.get('mainMenus').setValue(this.mainData);
            }
        });
      } else {
        this.mainMenu.initDataMenu(this.mainData)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.loading = false;
        });
      }
    } else {
      if (this.roleService.getRole() && this.action === 'Edit') {
        this.extraMenu.loadDataMenu(this.extraData)
          .pipe(takeUntil(this.destroy$))
          .subscribe((value: any[]) => {
            this.loading = false;
            if (this.extraData.length === 0) {
              this.extraData = value;
              this.formGroup.get('extraMenus').setValue(this.extraData);
            }
        });
      } else {
        this.extraMenu.initDataMenu(this.extraData)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.loading = false;
        });
      }
    }
  }

  onSelectMain(datas: any[]) {
    if (this.mainData.length !== datas.length) {
      this.disabled = false;
      this.formGroup.get('mainMenus').markAsDirty();
    }
    this.mainData = [];
    this.mainData = [...this.mainData, ...datas];
    this.formGroup.get('mainMenus').setValue(this.mainData);
  }

  onSelectExtra(datas: any[]) {
    if (this.extraData.length !== datas.length) {
      this.disabled = false;
      this.formGroup.get('extraMenus').markAsDirty();
    }
    this.extraData = [];
    this.extraData = [...this.extraData, ...datas];
    this.formGroup.get('extraMenus').setValue(this.extraData);
  }

}
