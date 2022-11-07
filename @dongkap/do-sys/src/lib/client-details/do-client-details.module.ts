import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoDatatableModule,
  DoLabelModule,
  DoSelectModule,
} from '@dongkap/do-shared';
import { DoClientDetailsRoutingModule } from './do-client-details-routing.module';
import { DoClientDetailsComponent } from './do-client-details.component';
import { ClientDetailsListComponent } from './list/client-details-list.component';
import { ClientDetailsService } from './services/client-details.service';
import { ClientDetailsEditPageComponent } from './edit/client-details-edit-page.component';
import { NbAlertModule, NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';

const COMPONENTS = [
  DoClientDetailsComponent,
  ClientDetailsListComponent,
  ClientDetailsEditPageComponent,
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbButtonModule,
  TranslateModule,
  NgxDatatableModule,
  ModalModule.forRoot(),
  DoInputModule,
  DoCheckBoxModule,
  DoSelectModule,
  DoButtonModule,
  DoBaseModule,
  DoDatatableModule,
  DoLabelModule,
  DoClientDetailsRoutingModule,
];

const PROVIDERS = [
  ClientDetailsService,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...PROVIDERS,
  ],
})
export class DoClientDetailsModule { }
