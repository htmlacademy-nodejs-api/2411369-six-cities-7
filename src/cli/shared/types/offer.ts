import { City } from './city.js';
import { Goods } from './goods.js';
import { OfferType } from './offer-type.js';
import { User } from './user.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  user: User;
  latitude: number;
  longitude: number;
}
