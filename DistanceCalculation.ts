import { getPreciseDistance } from 'geolib';

export const getDistance = (
  startPoint: { lat1: string | number, lng1: string | number },
  endPoint: { lat2: string | number, lng2: string | number },
) => {
  return getPreciseDistance({
    latitude: startPoint.lat1,
    longitude: startPoint.lng1,
  }, {
    latitude: endPoint.lat2,
    longitude: endPoint.lng2,
  });
};
