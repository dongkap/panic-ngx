import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbDialogModule,
  NbWindowModule,
  NbButtonModule,
  NbAccordionModule,
} from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { PANIC_INDEXED_DB } from '@dongkap/do-core';
import { DoThemeModule } from '@dongkap/do-theme';
import {
  DoBaseModule,
  DoButtonModule,
  DoCheckBoxModule,
  DoDatatableModule,
  DoInputModule,
  DoLabelModule,
  DoMapsModule,
  DoSelectModule,
} from '@dongkap/do-shared';
import { PanicIndexedDBService } from './storage/panic-indexeddb.service';
import { PanicService } from './services/panic.service';
import { DoPanicPreviewComponent } from './details-panic/preview/do-panic-preview.component';
import { DoPanicDetailComponent } from './details-panic/do-panic-detail.component';
import { DoFakeReportPromptComponent } from './details-panic/prompt/do-fake-report-prompt.component';

const PANIC_COMPONENTS = [
  DoPanicDetailComponent,
  DoPanicPreviewComponent,
  DoFakeReportPromptComponent,
];

const PANIC_PROVIDERS = [
  { provide: PANIC_INDEXED_DB, useClass: PanicIndexedDBService },
  PanicIndexedDBService,
  PanicService,
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbAlertModule,
    NbIconModule,
    NbButtonModule,
    NbAccordionModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    TranslateModule,
    NgxDatatableModule,
    DoThemeModule,
    DoInputModule,
    DoCheckBoxModule,
    DoButtonModule,
    DoBaseModule,
    DoSelectModule,
    DoMapsModule,
    DoDatatableModule,
    DoLabelModule,
  ],
  exports: [
    ...PANIC_COMPONENTS,
  ],
  declarations: [
    ...PANIC_COMPONENTS,
  ],
})
export class DoPanicModule {
  static forRoot(): ModuleWithProviders<DoPanicModule> {
    return {
      ngModule: DoPanicModule,
      providers: [
        ...PANIC_PROVIDERS,
      ],
    };
  }
}
