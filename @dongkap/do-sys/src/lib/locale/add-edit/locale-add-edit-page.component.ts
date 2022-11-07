import { Component, Injector } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { ApiBaseResponse, ResponseCode, HttpBaseModel, LocaleModel } from '@dongkap/do-core';
import { BaseFormComponent, CheckboxModel } from '@dongkap/do-shared';
import { LocaleService } from '../services/locale.service';
import { DialogFlagComponent } from './dialog-flag/dialog-flag.component';

@Component({
  selector: 'do-locale-add-edit-page',
  styleUrls: ['./locale-add-edit-page.component.scss'],
  templateUrl: './locale-add-edit-page.component.html',
})
export class LocaleAddEditPageComponent extends BaseFormComponent<any> implements OnInit {

  public apiSelectLanguage: HttpBaseModel;
  public localeDefault: boolean = false;
  public localeCode: string;
  public dataDefault: CheckboxModel[] = [
    {
      id: 'default',
      selected: false,
    },
  ];
  constructor(
    public injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private localeService: LocaleService,
    private dialogService: NbDialogService) {
    super(injector,
      {
        language: [],
        icon: [],
        default: [],
      });
    this.localeCode = this.route.snapshot.params['locale'];
  }

  ngOnInit(): void {
    if (this.localeCode != null) {
      this.action = 'Edit';
      if (!this.localeService.getLocale()) {
        this.getRequestLocale(this.localeCode);
      } else {
        this.putLocaleToForm();
      }
    }
  }

  getRequestLocale(locale: string): void {
    this.onInitData('master','get-locale', [locale])
      .subscribe((response: any) => {
        this.localeService.setLocale(response);
        this.putLocaleToForm();
      });
  }

  putLocaleToForm(): void {
    this.localeDefault = this.localeService.getLocale().localeDefault;
    this.formGroup.get('default').setValue([{
      id: 'default',
      selected: this.localeDefault,
    }]);
    if(this.localeDefault) {
      this.formGroup.get('default').disable();
    }
    this.formGroup.get('icon').setValue(this.localeService.getLocale().icon);
    this.formGroup.get('language').setValue(this.localeService.getLocale().identifier);
    this.formGroup.get('language').disable();
  }

  onSearchFlag(): void {
    this.dialogService.open(DialogFlagComponent)
      .onClose.subscribe((flagIcon: string) => {
        this.formGroup.get('icon').setValue(flagIcon);
        this.formGroup.get('icon').markAsDirty();
      });
  }

  onReset(): void {
    this.router.navigate(['/app/sysconf/i18n']);
  }

  onSubmit(): void {
    const localeDefault: CheckboxModel[] = this.formGroup.get('default').value;
    const data: LocaleModel = {
      icon: this.formGroup.get('icon').value,
      localeDefault: (localeDefault ? true : false),
      localeCode: this.formGroup.get('language').value['value'] ?
                  this.formGroup.get('language').value['value'] : this.localeService.getLocale().localeCode,
      identifier: this.formGroup.get('language').value['label'] ?
                  this.formGroup.get('language').value['label'] : this.localeService.getLocale().identifier,
      localeEnabled: true,
    };
    (super.onSubmit(data, 'master', 'post-locale')  as Observable<ApiBaseResponse>)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (response.respStatusCode === ResponseCode.OK_SCR010.toString()) {
          this.router.navigate(['/app/sysconf/i18n']);
        }
      });
  }

}
