import { LatLngExpression } from 'leaflet';

export type MarkerT = {
  id: number;
  lat: number;
  lng: number;
  title: string;
  locationType: string;
};
export type SelectedPositionT = {
  lat: number;
  lng: number;
};
export type MapStoreT = {
  markers: MarkerT[];
  selectedPosition: LatLngExpression;
  addMarker: (marker: MarkerT) => void;
  editMarker: (marker: MarkerT) => void;
  setSelectedPosition: (position: SelectedPositionT) => void;
};

export type MapT = {
  zoom: number;
  classname: string;
  multiMarker?: boolean;
  shouldGetLocation?: boolean;
};

export type LocationMarkerT = {
  multiMarker: boolean;
  shouldGetLocation: boolean;
};
