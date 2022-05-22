import * as NodeGeocoder from 'node-geocoder';
import { getDistance as calculateDistance } from 'geolib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeocodingService {
  async getDistance(startAddress: string, destinationAddress: string) {
    const geocoder = NodeGeocoder({
      provider: "openstreetmap",
    });

    try {
      const [startCoordinates] = await geocoder.geocode(startAddress);
      const [destinationCoordinates] = await geocoder.geocode(destinationAddress);
      const distance = calculateDistance(
        { latitude: startCoordinates.latitude, longitude: startCoordinates.longitude },
        { latitude: destinationCoordinates.latitude, longitude: destinationCoordinates.longitude },
      );

      return distance;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        console.log(error.stack);
        return;
      }
      console.log(error);
    }

  }
}
