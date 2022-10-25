import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TreeMode } from 'tree-ngx';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ApiBaseResponse, HttpBaseModel, LocaleModel, ResponseCode } from '@dongkap/do-core';
import { BaseFormComponent } from '@dongkap/do-shared';
import { DialogIconComponent } from '../dialog-icon/dialog-icon.component';

@Component({
  selector: 'do-main-menu-page',
  styleUrls: ['./main-menu-page.component.scss'],
  templateUrl: './main-menu-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MainMenuPageComponent extends BaseFormComponent<any> implements OnInit {

  public nodeItems: any = [];
  public options: any = {
    mode: TreeMode.NoSelect,
    checkboxes: false,
    alwaysEmitSelected: true
  };
  public allLocales: LocaleModel[] = [];
  public locales: LocaleModel[] = [];
  public localeDefault: LocaleModel = new LocaleModel();
  public action: 'Add' | 'Edit' = 'Add';
  public dialogAction: 'Edit' | 'Delete' = 'Edit';
  public apiSelectParent: HttpBaseModel;
  public apiPathLocale: HttpBaseModel;
  public root: boolean;
  public group: boolean;
  public loadLocale: boolean = false;
  public title: string = null;
  private data: any;
  private context: any;
  private node: any;
  public rootData = [{
      id: 'root',
      disabled: false,
  }];
  public groupData = [{
      id: 'group',
      disabled: false,
  }];
  public homeData = [{
      id: 'home',
      disabled: false,
  }];

  public set isRoot(root: boolean) {
    this.root = root;
    if (root) {
      this.formGroup.get('icon').enable();
      this.formGroup.get('parent').disable();
      this.formGroup.get('parent').setValue(null);
    } else {
      this.formGroup.get('icon').disable();
      this.formGroup.get('icon').setValue(null);
      this.formGroup.get('parent').enable();
    }
  }
  public get isRoot(): boolean { return this.root; }
  public set isGroup(group: boolean) {
    this.group = group;
    if (group) {
      this.formGroup.get('root').disable();
      this.formGroup.get('home').disable();
      this.formGroup.get('code').disable();
      this.formGroup.get('link').disable();
      this.formGroup.get('icon').disable();
      this.formGroup.get('parent').disable();

      this.formGroup.get('root').setValue(null);
      this.formGroup.get('home').setValue(null);
      this.formGroup.get('code').setValue('N/A');
      this.formGroup.get('link').setValue('#');
      this.formGroup.get('icon').setValue(null);
      this.formGroup.get('parent').setValue(null);
    } else {
      this.formGroup.get('root').enable();
      this.formGroup.get('home').enable();
      this.formGroup.get('code').enable();
      this.formGroup.get('link').enable();
      if (this.isRoot) { this.formGroup.get('icon').enable(); }
      if (!this.isRoot) { this.formGroup.get('parent').enable(); }
    }
  }
  public get isGroup(): boolean { return this.group; }

  constructor(public injector: Injector, private dialogService: NbDialogService) {
    super(injector,
      {
        id: [],
        'en-US': [],
        'id-ID': [],
        root: [{
          value: [{
            id: 'root',
            selected: true,
          }],
          disabled: false,
        }],
        code: [{
          value: 'N/A',
          disabled: false,
        }],
        icon: [],
        link: [{
          value: '#',
          disabled: false,
        }],
        home: [{
          value: null,
          disabled: false,
        }],
        group: [{
          value: null,
          disabled: false,
        }],
        parent: [],
        order: [],
      });
    this.apiSelectParent = this.api['security']['select-main-menus'];
    this.isRoot = true;
    this.isGroup = false;
  }

  ngOnInit(): void {}

  onCheckedRoot(event: any) {
    this.isRoot = event ? event[0].selected : false;
  }

  onCheckedGroup(event: any) {
    this.isGroup = event ? event[0].selected : false;
  }

  loadDataMenu(): Observable<any> {
    if (!this.loadLocale) {
      this.loadingForm = true;
      this.http.HTTP_AUTH(this.api['master']['all-locale']).subscribe(response => {
        this.splitLocale(response);
        this.loadLocale = true;
        this.loadingForm = false;
      });
    }
    return this.http.HTTP_AUTH(
      this.api['security']['get-tree-menus'], null, null, null,
      ['main']).pipe(map((response: any) => {
        this.nodeItems = [];
        this.nodeItems = [...this.nodeItems, ...response];
        this.onReset();
        if (this.loadLocale) { this.loadingForm = false; }
      }));
  }

  splitLocale(values: LocaleModel[]): void {
    this.allLocales = values;
    values.forEach(data => {
      if (data.localeDefault) {
        this.localeDefault = data;
      } else {
        this.locales.push(data);
      }
      this.formGroup.removeControl(data.localeCode);
      this.formGroup.addControl(data.localeCode, new FormControl());
    });
  }

  onSearchIcon(): void {
    this.dialogService.open(DialogIconComponent)
      .onClose.subscribe((icon: string) => {
        this.formGroup.get('icon').setValue(icon);
        this.formGroup.get('icon').markAsDirty();
      });
  }

  onSelectNode(node: any) {
    if (node.item) {
      this.action = 'Edit';
      this.dialogAction = this.action;
      this.isRoot = node.item['level'] === 0 ? true : false;
      this.isGroup = node.item['group'];
      this.allLocales.forEach(locale => {
        this.formGroup.get(locale.localeCode).setValue(node.item['i18n'][locale.localeCode]);
        if (locale.localeDefault) {
          this.title = node.item['i18n'][locale.localeCode];
        }
      });
      this.formGroup.get('group').setValue([{ id: 'group', selected: this.isGroup }]);
      this.formGroup.get('root').setValue([{ id: 'root', selected: this.isRoot }]);
      this.formGroup.get('home').setValue([{ id: 'home', selected: node.item['home'] }]);
      this.formGroup.get('id').setValue(node['id']);
      this.formGroup.get('code').setValue(node.item['code']);
      this.formGroup.get('link').setValue(node.item['link']);
      this.formGroup.get('icon').setValue(node.item['icon']);
      this.formGroup.get('order').setValue(node.item['ordering']);
      if (node.item['parentMenu']) {
        this.formGroup.get('parent').setValue({
          label: node.item['parentMenu']['title'],
          value: node.item['parentMenu']['id'],
        });
      }
    }
  }

  onDeleteTree(node: any, context: any, dialog: TemplateRef<any>) {
    this.dialogAction = 'Delete';
    this.node = node;
    this.context = context;
    this.dialogService.open(
      dialog,
      { context: 'alert.delete' });
  }

  onSubmit(dialog: TemplateRef<any>) {
    let id: string = null;
    let code: string = 'N/A';
    let icon: string = null;
    let link: string = '#';
    const type: string = 'main';
    let ordering: number = 0;
    let home: boolean = false;
    let group: boolean = false;
    let level: number = 1;
    let leaf: boolean = true;
    const i18n: any = {};
    let parentMenu: any = null;
    if (this.formGroup.get('id').value) { id = this.formGroup.get('id').value; }
    if (this.formGroup.get('code').value) { code = this.formGroup.get('code').value; }
    if (this.formGroup.get('icon').value) { icon = this.formGroup.get('icon').value; }
    if (this.formGroup.get('link').value) { link = this.formGroup.get('link').value; }
    if (this.formGroup.get('order').value) { ordering = +this.formGroup.get('order').value; }
    if (this.formGroup.get('home').value) {
      if (this.formGroup.get('home').value[0]['selected']) {
        home = true;
      }
    }
    if (this.formGroup.get('root').value) {
      if (this.formGroup.get('root').value[0]['selected']) {
        level = 0;
        leaf = false;
      }
    }
    this.allLocales.forEach(locale => {
      i18n[locale.localeCode] = this.formGroup.get(locale.localeCode).value;
    });
    if (this.formGroup.get('parent').value) {
      if (this.formGroup.get('parent').value['value']) {
        parentMenu = {
          id: this.formGroup.get('parent').value['value'],
        };
      }
    }
    if (this.formGroup.get('group').value) {
      if (this.formGroup.get('group').value[0]['selected']) {
        group = true;
        home = false;
        leaf = false;
        level = 0;
        parentMenu = null;
      }
    }
    this.data = {
      id,
      code,
      icon,
      link,
      type,
      level,
      ordering,
      home,
      group,
      leaf,
      i18n,
      parentMenu,
    };
    if (this.action === 'Edit') {
      this.dialogService.open(
        dialog,
        { context: 'alert.edit' });
    } else {
      this.postMenu();
    }
  }

  onSubmitDialog(ref: NbDialogRef<any>) {
    if (this.dialogAction === 'Delete') {
      this.deleteTreeMenu(ref);
    } else {
      this.postMenu(ref);
    }
  }

  onReset() {
    this.disabled = false;
    this.isRoot = true;
    this.isGroup = false;
    this.title = null;
    this.action = 'Add';
    this.allLocales.forEach(locale => {
      this.formGroup.get(locale.localeCode).setValue(null);
    });
    this.formGroup.get('group').setValue([{ id: 'group', selected: this.isGroup }]);
    this.formGroup.get('home').setValue([{ id: 'home', selected: false }]);
    this.formGroup.get('root').setValue([{ selected: this.isRoot }]);
    this.formGroup.get('id').setValue(null);
    this.formGroup.get('code').setValue('N/A');
    this.formGroup.get('link').setValue('#');
    this.formGroup.get('icon').setValue(null);
    this.formGroup.get('order').setValue(null);
    this.formGroup.get('parent').setValue(null);
  }

  private deleteTreeMenu(ref: NbDialogRef<any>) {
    this.disabled = true;
    this.http.HTTP_AUTH(this.api['security']['delete-menu'], null, null, null,
    [this.node['id']]).subscribe(
      (success: ApiBaseResponse) => {
        ref.close();
        this.context.delete();
        this.disabled = false;
        this.toastr.showI18n(success.respStatusMessage[success.respStatusCode], true);
        this.loadDataMenu().subscribe(() => {
          this.loadingForm = false;
        });
      },
      (error: ApiBaseResponse) => {
        this.disabled = false;
        this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
      },
    );
  }

  private postMenu(ref?: NbDialogRef<any>) {
    (super.onSubmit(this.data, 'security', 'post-menus')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_DEFAULT.toString()) {
          this.loadDataMenu().subscribe(() => {
            this.loadingForm = false;
          });
        }
        if (this.action === 'Edit') { ref.close(); }
      });
  }

}
