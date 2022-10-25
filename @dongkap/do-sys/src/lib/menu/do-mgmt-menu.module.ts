import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbDialogModule,
  NbTabsetModule,
  NbSpinnerModule,
  NbButtonModule,
} from '@nebular/theme';
import { TreeNgxModule } from 'tree-ngx';
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
import { MgmtMenuComponent } from './do-mgmt-menu.component';
import { MenuPageComponent } from './page/menu-page.component';
import { DoMgmtMenuRoutingModule } from './do-mgmt-menu-routing.module';
import { MainMenuPageComponent } from './main/main-menu-page.component';
import { ExtraMenuPageComponent } from './extra/extra-menu-page.component';
import { DialogIconComponent } from './dialog-icon/dialog-icon.component';

const components = [
  MgmtMenuComponent,
  MenuPageComponent,
  MainMenuPageComponent,
  ExtraMenuPageComponent,
  DialogIconComponent,
];

const entryComponents = [
  DialogIconComponent,
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
  NbTabsetModule,
  NbSpinnerModule,
  TreeNgxModule,
  DoMgmtMenuRoutingModule,
];

const providers = [
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
  ]
})
export class DoMgmtMenuModule { }
