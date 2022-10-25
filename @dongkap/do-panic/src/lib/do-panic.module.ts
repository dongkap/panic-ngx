import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PANIC_INDEXED_DB } from '@dongkap/do-core';
import { PanicIndexedDBService } from './storage/panic-indexeddb.service';
import { PanicService } from './services/panic.service';

const PANIC_PROVIDERS = [
  { provide: PANIC_INDEXED_DB, useClass: PanicIndexedDBService },
  PanicIndexedDBService,
  PanicService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
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
