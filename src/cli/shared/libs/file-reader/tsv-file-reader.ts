import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType, User, City, Goods } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      postDate,
      city,
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
      name,
      email,
      avatarUrl,
      password,
      isPro,
      latitude,
      longitude,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: city as City,
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
      user: this.parseUser(name, email, avatarUrl, password, this.parseStringToBoolean(isPro)),
      latitude: this.parseStringToFloatNumber(latitude),
      longitude: this.parseStringToFloatNumber(longitude),
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

  private parseUser(
    name: string,
    email: string,
    avatarUrl: string,
    password: string,
    isPro: boolean): User {
    return { name, email, avatarUrl, password, isPro };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
