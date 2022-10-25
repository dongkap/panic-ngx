import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbDialogModule,
  NbButtonModule,
  NbTabsetModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { DoThemeModule } from '@dongkap/do-theme';
import {
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoSelectModule,
  DoDatatableModule,
  DoEditorModule,
} from '@dongkap/do-shared';
import { MgmtCorporateComponent } from './do-mgmt-corporate.component';
import { DoMgmtCorporateRoutingModule } from './do-mgmt-corporate-routing.module';
import { CorporateService } from './services/corporate.service';
import { CorporateListPageComponent } from './list/corporate-list-page.component';
import { CorporateAddEditPageComponent } from './add-edit/corporate-add-edit-page.component';

const components = [
  MgmtCorporateComponent,
  CorporateListPageComponent,
  CorporateAddEditPageComponent,
];

const modules = [
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbButtonModule,
  NbDialogModule.forChild(),
  NbTabsetModule,
  NbSpinnerModule,
  DoThemeModule,
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoSelectModule,
  DoDatatableModule,
  DoEditorModule,
  DoMgmtCorporateRoutingModule,
];

const providers = [
  CorporateService,
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
})
export class DoMgmtCorporateModule { }
