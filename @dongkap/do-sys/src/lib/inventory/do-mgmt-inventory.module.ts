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
import { MgmtInventoryComponent } from './do-mgmt-inventory.component';
import { DoMgmtInventoryRoutingModule } from './do-mgmt-inventory-routing.module';
import { InventoryService } from './services/inventory.service';
import { InventoryListPageComponent } from './list/inventory-list-page.component';
import { InventoryAddEditPageComponent } from './add-edit/inventory-add-edit-page.component';

const components = [
  MgmtInventoryComponent,
  InventoryListPageComponent,
  InventoryAddEditPageComponent,
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
  DoMgmtInventoryRoutingModule,
];

const providers = [
  InventoryService,
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
export class DoMgmtInventoryModule { }
