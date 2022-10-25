import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NbCardModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { DoToastrModule } from '../toastr/do-toastr.module';
import { DoErrorMessageComponent } from './error-message/do-error-message.component';
import { DoWarnMessageComponent } from './warn-message/do-warn-message.component';
import { DoContainerOutletComponent } from './container-outlet/do-container-outlet.component';
import { DoPageOutletComponent } from './page-outlet/do-page-outlet.component';
import { DoCollapseComponent } from './collapse/do-collapse.component';
import { EqualValidator } from './directive/equal-validator.directive';
import { NotEqualValidator } from './directive/not-equal-validator.directive';
import { DragDropDirective } from './directive/drag-drop.directive';
import { DoCardCollapseComponent } from './card-collapse/do-card-collapse.component';
import { MaskedInputDirective } from './directive/text-mask.directive';

export const BASE_COMPONENTS = [
  DoWarnMessageComponent,
  DoErrorMessageComponent,
  DoContainerOutletComponent,
  DoPageOutletComponent,
  DoCollapseComponent,
  DoCardCollapseComponent,
  MaskedInputDirective,
];

export const BASE_DIRECTIVES = [
  EqualValidator,
  NotEqualValidator,
  DragDropDirective,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NbCardModule,
    NbIconModule,
    NbSelectModule,
    DoToastrModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  declarations: [
    ...BASE_COMPONENTS,
    ...BASE_DIRECTIVES,
  ],
  exports: [
    ...BASE_COMPONENTS,
    ...BASE_DIRECTIVES,
  ],
})
export class DoBaseModule { }
