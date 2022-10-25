import { LatLngExpression } from 'leaflet';

export class LeafletModel {
    public mark: LatLngExpression;
    public title?: string = '';
    public alt?: string = '';
    public className?: string;
}
