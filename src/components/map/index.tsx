'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import { LocationMarker } from './partials';
import { useMapStore } from '@/store';
import { MapT } from '@/types';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function Map({
  zoom,
  classname,
  multiMarker = false,
  shouldGetLocation = true,
}: MapT) {
  const selectedPosition = useMapStore((state) => state.selectedPosition);
  return (
    <MapContainer
      center={selectedPosition}
      zoom={zoom}
      scrollWheelZoom
      className={classname}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker
        shouldGetLocation={shouldGetLocation}
        multiMarker={multiMarker}
      />
    </MapContainer>
  );
}
