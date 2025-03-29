import { useGeolocated } from 'react-geolocated';

export default function useGeoLocation() {
  const {
    isGeolocationAvailable,
    isGeolocationEnabled,
    getPosition,
    coords,
    positionError,
    timestamp
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0
    },
    // userDecisionTimeout: 5000,
    watchPosition: true
  });

  return {
    isGeolocationAvailable,
    isGeolocationEnabled,
    coords,
    positionError,
    timestamp,
    getPosition
  };
}