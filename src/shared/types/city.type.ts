import { Location } from './location.type.js';

const OFFER_CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
] as const;

export type CityName = typeof OFFER_CITIES[number]

export type City = {
  name: CityName;
  location: Location;
};
