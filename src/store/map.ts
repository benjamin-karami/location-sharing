import { create } from 'zustand';
import { LatLngExpression } from 'leaflet';
// in here we can add a Async fetch to get markers from api for userId but here we have it hard coded

type MarkerT = {
  id: number;
  lat: number;
  lng: number;
  title: string;
  locationType: string;
};
type SelectedPositionT = {
  lat: number;
  lng: number;
};
type MapStoreT = {
  markers: MarkerT[];
  selectedPosition: LatLngExpression;
  addMarker: (marker: MarkerT) => void;
  editMarker: (marker: MarkerT) => void;
  setSelectedPosition: (position: SelectedPositionT) => void;
};

export const useMapStore = create<MapStoreT>((set) => ({
  markers: [
    {
      id: 1,
      lat: 35.80123039384566,
      lng: 51.49993154840599,
      title: 'Home',
      locationType: 'business',
    },
    {
      id: 2,
      lat: 35.79564711206723,
      lng: 51.51063339407441,
      title: 'Restaurant',
      locationType: 'business2',
    },
    {
      id: 3,
      lat: 60.931615076760906,
      lng: 9.336751385547577,
      title: 'Office',
      locationType: 'business2',
    },
     
  ],
  selectedPosition: { lat: 32.36346037994745, lng: 51.7879223678633, },
  addMarker: (marker: MarkerT) => {
    set((state) => ({ markers: [...state.markers, marker] }));
  },
  editMarker: (editedMarker: MarkerT) => {
    set((state) => {
      const index = state.markers.findIndex(
        (marker) => marker.id === editedMarker.id,
      );
      if (index !== -1) {
        const updatedMarkers = [...state.markers];
        updatedMarkers[index] = editedMarker;

        return { markers: updatedMarkers };
      }
      return state;
    });
  },
  setSelectedPosition: (position: SelectedPositionT) => {
    set({ selectedPosition: position });
  },
}));

// could write edit marker like below, but I thought maybe user had too many locations and mapping on them is not good
// the code is more but maybe its better

// editMarker: (editedMarker: MarkerT) => {
//   set((state) => ({
//     markers: state.markers.map((marker) =>
//         marker.id === editedMarker.id ? editedMarker : marker
//     ),
//   }));
// },
