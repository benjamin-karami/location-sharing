import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useMapStore } from '@/store';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';

type MarkerT = {
  id: number;
  lat: number;
  lng: number;
  title: string;
};
type LocationMarkerT = {
  multiMarker: boolean;
  shouldGetLocation: boolean;
};

export function LocationMarker({
  multiMarker,
  shouldGetLocation,
}: LocationMarkerT) {
  const router = useRouter();
  const markers = useMapStore((state) => state.markers);
  const setPosition = useMapStore((state) => state.setSelectedPosition);
  const selectedPosition = useMapStore((state) => state.selectedPosition);
  const markerRef = useRef(null);
  const map = useMap();
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // @ts-ignore
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );

  const mapEvents = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
    },
  });

  useLayoutEffect(() => {
    // @ts-ignore
    const onLocationFound = (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), { animate: false });
    };
    if (shouldGetLocation) {
      map.locate();
      map.on('locationfound', onLocationFound);
    }
    return () => {
      map.off('locationfound', onLocationFound);
    };
  }, [map]);

  const handleEdit = (marker: MarkerT) => {
    setPosition({ lat: marker.lat, lng: marker.lng });
    router.push(`/location/edit/${marker.id}`);
  };

  if (!markers.length && multiMarker) return null;  

  return !multiMarker ? (
    <Marker
      draggable
      position={selectedPosition}
      eventHandlers={eventHandlers}
      ref={markerRef}
    />
  ) : (
    markers.map((marker: MarkerT) => (
      <Marker key={`marker-${marker.id}`} position={[marker.lat, marker.lng]}>
        <Popup>
          <div>
            <div className='p-2 text-amber-50 bg-green-400 w-[150px] text-center'>
              location
            </div>
            <p>{marker.title}</p>
            <button onClick={() => handleEdit(marker)}>edit</button>
          </div>
        </Popup>
      </Marker>
    ))
  );
}
