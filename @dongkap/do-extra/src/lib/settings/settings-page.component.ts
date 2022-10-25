import { Component, Injector, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import {
  IndexedDBEncFactoryService,
  AUTH_INDEXED_DB,
  SETTINGS_INDEXED_DB,
  ResponseCode,
} from '@dongkap/do-core';
import { HttpBaseModel } from '@dongkap/do-core';
import { ApiBaseResponse } from '@dongkap/do-core';
import { IndexedDBFactoryService } from '@dongkap/do-core';
import { CheckboxModel, BaseFormComponent } from '@dongkap/do-shared';

@Component({
  selector: 'do-settings-page',
  styleUrls: ['./settings-page.component.scss'],
  templateUrl: './settings-page.component.html',
})
export class SettingsPageComponent extends BaseFormComponent<any> implements OnInit {

  public apiSelectLocale: HttpBaseModel;
  public localeIcon: string;
  private localeCode: any;
  private localeIdentifier: any;
  public dataTheme: CheckboxModel[] = [
    {
      id: 'theme',
      selected: false,
    },
  ];

  constructor(
    public injector: Injector,
    private translate: TranslateService,
    private themeService: NbThemeService,
    @Inject(SETTINGS_INDEXED_DB) private settingsIndexedDB: IndexedDBFactoryService,
    @Inject(AUTH_INDEXED_DB) private authIndexedDB: IndexedDBEncFactoryService) {
      super(injector, {
        locale: [],
        theme: [],
      });
      this.apiSelectLocale = this.api['master']['select-all-locale'];
    }

  ngOnInit(): void {
    this.onInit('security', 'get-settings');
  }

  onInit(serviceName: string, apiName: string): void {
    this.loadingForm = true;
    this.exec(serviceName, apiName)
      .subscribe(
        (success: any) => {
          this.loadingForm = false;
          this.localeCode = success['localeCode'];
          this.localeIdentifier = success['localeIdentifier'];
          this.localeIcon = success['localeIcon'] ? success['localeIcon'] : '';
          this.formGroup.get('locale').setValue({
            value: this.localeCode,
            label: this.localeIdentifier
          });
          let darkMode: CheckboxModel[] = [{
            id: 'theme',
            selected: false,
          }];
          if (success['theme'] === 'dark') {
            darkMode = [{
              id: 'theme',
              selected: true,
            }];
          }
          this.formGroup.get('theme').setValue(darkMode);
          this.formGroup.markAsPristine();
          this.formGroup.markAsUntouched();
          this.formGroup.markAsPending();
        },
        (error: ApiBaseResponse) => {
          this.loadingForm = true;
          if (error.respStatusMessage) {
            this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
          }
        },
      );
  }

  onSubmit() {
    if (this.formGroup.get('locale')?.value['value']) {
      this.localeCode = this.formGroup.get('locale')?.value['value'];
      this.localeIdentifier = this.formGroup.get('locale')?.value['label'];
      this.localeIcon = this.formGroup.get('locale')?.value['icon'];
    }
    let theme: 'dark' | 'default' | 'cosmic' | 'corporate' = 'default';
    if (this.formGroup.get('theme')?.value) {
      theme = this.formGroup.get('theme')?.value[0].selected ? 'dark' : 'default';
    }
    const data: any = {
      localeCode: this.localeCode,
      localeIdentifier: this.localeIdentifier,
      localeIcon: this.localeIcon,
      theme,
    };
    this.disabled = true;
    this.initProgress();
    this.setProgress(65);
    Promise.all([
      this.settingsIndexedDB.get('locale'),
      this.settingsIndexedDB.get('theme'),
    ]).then((current: any[]) => {
      this.exec('security', 'change-settings', data).subscribe(
        (success: ApiBaseResponse) => {
          this.setProgress(95);
          this.disabled = false;
          this.formGroup.markAsPristine();
          this.formGroup.markAsUntouched();
          this.formGroup.markAsPending();
          if (success) {
            if (success.respStatusCode === ResponseCode.OK_SCR002.toString()) {
              this.changeTheme(theme);
              if (current[0] !== this.localeCode) {
                this.settingsIndexedDB.put('locale', this.localeCode).then(() => {
                  this.http.HTTP_AUTH(this.api['security']['get-menus']).subscribe(
                    (menus: any) => {
                      Promise.all([
                        this.authIndexedDB.putEnc('menus', JSON.stringify(menus['main'])),
                        this.authIndexedDB.putEnc('extras', JSON.stringify(menus['extra'])),
                      ]).then(() => {
                        this.translate.getTranslation(this.localeCode).subscribe((lang: any) => {
                          this.translate.use(this.localeCode);
                          this.translate.setTranslation(this.localeCode, lang, true);
                          this.toastr.showI18n(success.respStatusMessage[success.respStatusCode], true);
                        });
                      });
                    },
                    (error: any) => {
                      this.toastr.showI18n('error.translate', false, null, 'warning');
                    });
                });
              }
            }
          }
          this.doneProgress();
        },
        (error: ApiBaseResponse) => {
            this.disabled = false;
            this.toastr.showI18n(error.respStatusMessage[error.respStatusCode], true, null, 'danger');
            this.doneProgress();
        },
      );
    });
  }

  changeTheme(theme: string) {
    this.settingsIndexedDB.put('theme', theme).then();
    this.themeService.changeTheme(theme);
  }

}
