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
  DoDatePickerModule,
} from '@dongkap/do-shared';
import { MgmtBusinessPartnerComponent } from './do-mgmt-business-partner.component';
import { DoMgmtBusinessPartnerRoutingModule } from './do-mgmt-business-partner-routing.module';
import { BusinessPartnerService } from './services/business-partner.service';
import { BusinessPartnerListPageComponent } from './list/business-partner-list-page.component';
import { BusinessPartnerAddEditPageComponent } from './add-edit/business-partner-add-edit-page.component';

const components = [
  MgmtBusinessPartnerComponent,
  BusinessPartnerListPageComponent,
  BusinessPartnerAddEditPageComponent,
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
  DoDatePickerModule,
  DoMgmtBusinessPartnerRoutingModule,
];

const providers = [
  BusinessPartnerService,
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
export class DoMgmtBusinessPartnerModule { }
