import * as Location from 'expo-location';

// const API_KEY = 'AIzaSyD2QFUNJ8l0_nxw0l42okXdvLC_OjZ4kxU';
const API_KEY = 'xxxAIzaSyD2QFUNJ8l0_nxw0l42okXdvLC_OjZ4kxU';
const GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export const getCurrentAddress = async (): Promise<string> => {
  const coords = await getCurrentCoordinates();

  if (!coords) return '';

  const url = buildGeocodingUrl(coords.latitude, coords.longitude);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  const data = await response.json();
  return data.results[0]?.formatted_address;
};

const buildGeocodingUrl = (lat: number, lng: number): string => {
  return `${GEOCODING_URL}?latlng=${lat},${lng}&key=${API_KEY}`;
};

const verifyLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('For additional functionality, please enable location services');
  }
  return status === 'granted';
};

const getCurrentCoordinates = async () => {
  const hasPermission = await verifyLocationPermission();
  if (!hasPermission) {
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
};
