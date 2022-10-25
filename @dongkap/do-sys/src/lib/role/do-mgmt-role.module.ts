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
import { TreeNgxModule } from 'tree-ngx';
import { DoThemeModule } from '@dongkap/do-theme';
import {
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoSelectModule,
  DoDatatableModule,
} from '@dongkap/do-shared';
import { MgmtRoleComponent } from './do-mgmt-role.component';
import { DoMgmtRoleRoutingModule } from './do-mgmt-role-routing.module';
import { RoleListPageComponent } from './list/role-list-page.component';
import { RoleService } from './services/role.service';
import { RoleAddEditPageComponent } from './add-edit/role-add-edit-page.component';
import { RoleExtraPageComponent } from './add-edit/extra/role-extra-page.component';
import { RoleMainPageComponent } from './add-edit/main/role-main-page.component';

const components = [
  MgmtRoleComponent,
  RoleListPageComponent,
  RoleAddEditPageComponent,
  RoleExtraPageComponent,
  RoleMainPageComponent,
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
  TreeNgxModule,
  DoThemeModule,
  DoInputModule,
  DoCheckBoxModule,
  DoButtonModule,
  DoBaseModule,
  DoSelectModule,
  DoDatatableModule,
  DoMgmtRoleRoutingModule,
];

const providers = [
  RoleService,
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
export class DoMgmtRoleModule { }
