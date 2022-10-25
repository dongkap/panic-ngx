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

  public action: 'Add' | 'Edit' = 'Add';
  public apiSelectLanguage: HttpBaseModel;
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
    if (this.localeService.getLocale() || (this.route.snapshot.params['action'] === 'add')) {
      if ((this.route.snapshot.params['action'] === 'edit')) {
        this.action = 'Edit';
      }
      this.apiSelectLanguage = this.api['master']['select-language'];
      if (this.localeService.getLocale() && (this.route.snapshot.params['action'] === 'edit')) {
        if (this.localeService.getLocale().localeDefault) {
          this.formGroup.get('default').setValue([{
            id: 'default',
            selected: true,
          }]);
          this.formGroup.get('default').disable();
        } else {
          this.formGroup.get('default').setValue([{
            id: 'default',
            selected: false,
          }]);
        }
        this.formGroup.get('icon').setValue(this.localeService.getLocale().icon);
        this.formGroup.get('language').setValue(this.localeService.getLocale().identifier);
        this.formGroup.get('language').disable();
      }
    } else {
      this.router.navigate(['/app/sysconf/i18n']);
    }
  }

  ngOnInit(): void {}

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
