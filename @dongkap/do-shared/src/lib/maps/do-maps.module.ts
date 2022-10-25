import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NbCardModule } from '@nebular/theme';
import { DoMapsLeafletComponent } from './leaflet/do-maps-leaflet.component';

export const MAPS_COMPONENT = [
  DoMapsLeafletComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LeafletModule.forRoot(),
    NbCardModule,
  ],
  declarations: [
    ...MAPS_COMPONENT,
  ],
  exports: [
    ...MAPS_COMPONENT,
  ],
})
export class DoMapsModule { }
