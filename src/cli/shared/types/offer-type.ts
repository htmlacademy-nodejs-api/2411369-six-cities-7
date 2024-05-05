const OFFER_TYPE = [
  'apartment',
  'house',
  'room',
  'hotel'
] as const;

export type OfferType = typeof OFFER_TYPE[number];
