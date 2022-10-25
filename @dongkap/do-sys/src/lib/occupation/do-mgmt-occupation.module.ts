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
import { MgmtOccupationComponent } from './do-mgmt-occupation.component';
import { DoMgmtOccupationRoutingModule } from './do-mgmt-occupation-routing.module';
import { OccupationService } from './services/occupation.service';
import { OccupationListPageComponent } from './list/occupation-list-page.component';
import { OccupationAddEditPageComponent } from './add-edit/occupation-add-edit-page.component';

const components = [
  MgmtOccupationComponent,
  OccupationListPageComponent,
  OccupationAddEditPageComponent,
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
  DoMgmtOccupationRoutingModule,
];

const providers = [
  OccupationService,
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
export class DoMgmtOccupationModule { }
