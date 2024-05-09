import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { City, Goods, MockServerData, OfferType, User } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_RATING = 0;
const MAX_RATING = 5;
const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 6;
const MIN_ADULTS = 1;
const MAX_ADULTS = 10;
const MIN_PRICE = 500;
const MAX_PRICE = 2000;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<City>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = Boolean(generateRandomValue(0, 1));
    const isFavorite = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const type = getRandomItem<OfferType>(this.mockData.types);
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS);
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const goods = getRandomItems<Goods>(this.mockData.goods).join(';');
    const latitude = generateRandomValue(city.location.latitude - 0.01, city.location.latitude + 0.01, 6);
    const longitude = generateRandomValue(city.location.longitude - 0.01, city.location.longitude + 0.01, 6);
    const user = getRandomItem<User>(this.mockData.users);

    return [
      title,
      description,
      postDate,
      city.name,
      city.location.latitude,
      city.location.longitude,
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
      user.name,
      user.email,
      user.avatarUrl,
      user.isPro
    ].join('\t');
  }
}
