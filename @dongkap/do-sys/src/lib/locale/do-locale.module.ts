import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbAlertModule, NbIconModule, NbDialogModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { DoThemeModule } from '@dongkap/do-theme';
import {
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoSelectModule,
  DoDatatableModule,
} from '@dongkap/do-shared';
import { LocaleComponent } from './do-locale.component';
import { LocaleListPageComponent } from './list/locale-list-page.component';
import { DoLocaleRoutingModule } from './do-locale-routing.module';
import { LocaleAddEditPageComponent } from './add-edit/locale-add-edit-page.component';
import { LocaleService } from './services/locale.service';
import { DialogFlagComponent } from './add-edit/dialog-flag/dialog-flag.component';

const components = [
  LocaleComponent,
  LocaleListPageComponent,
  LocaleAddEditPageComponent,
  DialogFlagComponent,
];

const modules = [
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbDialogModule.forChild(),
  DoThemeModule,
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoSelectModule,
  DoDatatableModule,
  DoLocaleRoutingModule,
];

const providers = [
  LocaleService,
];

const entryComponents = [
  DialogFlagComponent,
];

@NgModule({
  imports: [
    ...modules,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ...providers,
  ],
  entryComponents: [
    ...entryComponents,
  ],
})
export class DoLocaleModule { }
