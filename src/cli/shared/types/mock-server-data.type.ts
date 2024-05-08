import { City } from './city.type.js';
import { Goods } from './goods.enum.js';
import { OfferType } from './offer-type.enum.js';
import { User } from './user.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  previewImages: string[];
  images: string[];
  types: OfferType[];
  goods: Goods[];
  users: User[];
};
