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
import { MgmtAppsComponent } from './do-mgmt-apps.component';
import { DoMgmtAppsRoutingModule } from './do-mgmt-apps-routing.module';
import { AppsService } from './services/apps.service';
import { AppsListPageComponent } from './list/apps-list-page.component';
import { AppsAddEditPageComponent } from './add-edit/apps-add-edit-page.component';

const components = [
  MgmtAppsComponent,
  AppsListPageComponent,
  AppsAddEditPageComponent,
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
  DoMgmtAppsRoutingModule,
];

const providers = [
  AppsService,
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
export class DoMgmtAppsModule { }
