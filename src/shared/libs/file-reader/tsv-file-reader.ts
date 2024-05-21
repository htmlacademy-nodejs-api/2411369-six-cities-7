import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType, User, City, Goods, Location, CityName } from '../../types/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      postDate,
      cityName,
      cityLatitude,
      cityLongitude,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      latitude,
      longitude,
      userName,
      userEmail,
      userAvatarUrl,
      userIsPro
    ] = line.split('\t');

    const user: User = {
      name: userName,
      email: userEmail,
      avatarUrl: userAvatarUrl,
      isPro: this.parseStringToBoolean(userIsPro)
    };

    const cityLocation: Location = {
      latitude: this.parseStringToFloatNumber(cityLatitude),
      longitude: this.parseStringToFloatNumber(cityLongitude)
    };

    const city: City = this.parseCity(cityName as CityName, cityLocation);

    return {
      title,
      description,
      postDate: new Date(postDate),
      city,
      previewImage,
      images: this.parseImages(images),
      isPremium: this.parseStringToBoolean(isPremium),
      isFavorite: this.parseStringToBoolean(isFavorite),
      rating: this.parseStringToFloatNumber(rating),
      type: type as OfferType,
      bedrooms: this.parseStringToNumber(bedrooms),
      maxAdults: this.parseStringToNumber(maxAdults),
      price: this.parseStringToNumber(price),
      goods: this.parseGoods(goods),
      location: {
        latitude: this.parseStringToFloatNumber(latitude),
        longitude: this.parseStringToFloatNumber(longitude)
      },
      user
    };
  }

  private parseImages(imageString: string): string[] {
    return imageString.split(';');
  }

  private parseStringToBoolean(value: string): boolean {
    return value === 'true';
  }

  private parseStringToFloatNumber(value: string): number {
    return Number.parseFloat(value);
  }

  private parseStringToNumber(value: string): number {
    return Number.parseInt(value, 10);
  }

  private parseGoods(goodsString: string) {
    const goodsArray = goodsString.split(';');
    const parsedGoods: Goods[] = [];

    for (const good of goodsArray) {
      const trimmedGood = good.trim();
      parsedGoods.push(trimmedGood as Goods);
    }

    return parsedGoods;
  }

  private parseCity(
    name: CityName,
    location: Location): City {
    return {
      name,
      location: location
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);

        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
