import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import * as L from 'leaflet';
import { delay } from 'rxjs/operators';
import { LeafletModel } from '../models/leaflet.model';

@Component({
  selector: 'do-maps-leaflet',
  styleUrls: ['./do-maps-leaflet.component.scss'],
  templateUrl: './do-maps-leaflet.component.html',
})
export class DoMapsLeafletComponent implements OnInit {

  public map: L.Map;
  public defaultLatLng: L.LatLng = L.latLng({ lat: -6.7615034, lng: 117.7397244 });
  public zoom: number = 4.8;
  @Input() public height: number = 25;
  @Input() public options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Civilians Emergency Report' }),
    ],
    zoom: this.zoom,
    zoomSnap: 0.1,
    zoomDelta: 1,
    center: this.defaultLatLng,
  };
  @Input() public layers: any[] = [];
  @Input() public set markersFn(markers: LeafletModel[]) {
    if (markers) {
      this.layers = [];
      markers.forEach(marker => {
        this.layers.push(L.marker(marker.mark, {
          icon: L.icon({
            iconUrl: `${document.getElementsByTagName('base')[0].href}assets/map/marker-icon.png`,
            shadowUrl: `${document.getElementsByTagName('base')[0].href}assets/map/marker-shadow.png`,
            iconSize: [27.5, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
            className: marker.className,
          }),
          title: marker.title,
          alt: marker.alt,
        }).on('click', this.markerClick.bind(this)));
      });
    }
  }
  @Output() public onMarkerClick: EventEmitter<LeafletModel> = new EventEmitter<LeafletModel>();

  ngOnInit(): void {
  }

  public markerClick(event): void {
    const latlng: L.LatLng = event.latlng as L.LatLng;
    const title: string = event.target.options.title;
    const alt: string = event.target.options.alt;
    this.onMarkerClick.emit({
      mark: latlng ,
      title: title,
      alt: alt,
    });
    this.map.flyTo(latlng, 16);
  }

  public onMapReady(map: L.Map): void {
    this.map = map;
  }

}
