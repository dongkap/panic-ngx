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
  selector: 'do-extra-menu-page',
  styleUrls: ['./extra-menu-page.component.scss'],
  templateUrl: './extra-menu-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ExtraMenuPageComponent extends BaseFormComponent<any> implements OnInit {

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
  public apiPathLocale: HttpBaseModel;
  public loadLocale: boolean = false;
  public title: string = null;
  private data: any;
  private context: any;
  private node: any;

  constructor(public injector: Injector, private dialogService: NbDialogService) {
    super(injector,
      {
        id: [],
        'en-US': [],
        'id-ID': [],
        code: [{
          value: 'N/A',
          disabled: false,
        }],
        link: [{
          value: '#',
          disabled: false,
        }],
        order: [],
      });
  }

  ngOnInit(): void {}

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
      ['extra']).pipe(map((response: any) => {
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
      this.allLocales.forEach(locale => {
        this.formGroup.get(locale.localeCode).setValue(node.item['i18n'][locale.localeCode]);
      });
      this.formGroup.get('id').setValue(node['id']);
      this.formGroup.get('code').setValue(node.item['code']);
      this.formGroup.get('link').setValue(node.item['link']);
      this.formGroup.get('order').setValue(node.item['ordering']);
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
    let link: string = '#';
    let ordering: number = 0;
    const type: string = 'extra';
    const icon: string = null;
    const home: boolean = false;
    const group: boolean = false;
    const level: number = 0;
    const leaf: boolean = false;
    const i18n: any = {};
    const parentMenu: any = null;
    if (this.formGroup.get('id').value) { id = this.formGroup.get('id').value; }
    if (this.formGroup.get('code').value) { code = this.formGroup.get('code').value; }
    if (this.formGroup.get('link').value) { link = this.formGroup.get('link').value; }
    if (this.formGroup.get('order').value) { ordering = +this.formGroup.get('order').value; }
    this.allLocales.forEach(locale => {
      i18n[locale.localeCode] = this.formGroup.get(locale.localeCode).value;
    });
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
    this.title = null;
    this.action = 'Add';
    this.allLocales.forEach(locale => {
      this.formGroup.get(locale.localeCode).setValue(null);
    });
    this.formGroup.get('id').setValue(null);
    this.formGroup.get('code').setValue('N/A');
    this.formGroup.get('link').setValue('#');
    this.formGroup.get('order').setValue(null);
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
