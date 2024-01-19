import { useMapEvents } from 'react-leaflet';
import { useState, useRef } from 'react';

export const useGetLocation = () => {
  const [position, setPosition] = useState(undefined);
  const isInitialMount = useRef(true);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      // @ts-ignore
      setPosition(e.latlng);

      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        map.flyTo(e.latlng, map.getZoom());
      }
    },
  });

  if (isInitialMount.current) {
    map.locate();
  }

  return { position };
};
