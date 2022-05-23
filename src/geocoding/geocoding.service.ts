import * as NodeGeocoder from 'node-geocoder';
import { getDistance as calculateDistance } from 'geolib';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GeocodingService {

  private readonly logger = new Logger(GeocodingService.name);

  async getDistance(startAddress: string, destinationAddress: string) {
    const geocoder = NodeGeocoder({
      provider: "openstreetmap",
    });

    try {
      const [startCoordinates] = await geocoder.geocode(startAddress);
      const [destinationCoordinates] = await geocoder.geocode(destinationAddress);

      if (!startCoordinates) {
        throw new Error('Start address data is not found');
      }

      if (!destinationCoordinates) {
        throw new Error('Destination address data is not found');
      }

      const distance = calculateDistance(
        { latitude: startCoordinates.latitude, longitude: startCoordinates.longitude },
        { latitude: destinationCoordinates.latitude, longitude: destinationCoordinates.longitude },
      );

      return distance;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }
}
