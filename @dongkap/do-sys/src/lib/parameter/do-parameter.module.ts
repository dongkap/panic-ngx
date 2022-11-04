import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbAlertModule, NbIconModule, NbDialogModule, NbButtonModule } from '@nebular/theme';
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
import { ParameterComponent } from './do-parameter.component';
import { DoParameterRoutingModule } from './do-parameter-routing.module';
import { ParameterService } from './services/parameter.service';
import { ParameterListGroupPageComponent } from './parameter-group/list/parameter-list-group-page.component';
import { ParameterAddGroupPageComponent } from './parameter-group/add/parameter-add-group-page.component';
import { ParameterListDetailPageComponent } from './parameter-detail/list/parameter-list-detail-page.component';
import { ParameterAddEditMultiDetailPageComponent } from './parameter-detail/add-edit-multi/parameter-add-edit-multi-detail-page.component';
import { ParameterAddEditSingleDetailPageComponent } from './parameter-detail/add-edit-single/parameter-add-edit-single-detail-page.component';

const components = [
  ParameterComponent,
  ParameterListGroupPageComponent,
  ParameterAddGroupPageComponent,
  ParameterListDetailPageComponent,
  ParameterAddEditMultiDetailPageComponent,
  ParameterAddEditSingleDetailPageComponent,
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
  DoThemeModule,
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoSelectModule,
  DoDatatableModule,
  DoParameterRoutingModule,
];

const providers = [
  ParameterService,
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
export class DoParameterModule { }
