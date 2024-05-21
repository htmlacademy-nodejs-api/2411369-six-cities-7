import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';

import { City, Goods, Location, OFFER_GOODS, OFFER_TYPE, OfferType, User } from '../../types/index.js';
import { UserEntity } from '../user/index.js';
import { CityEntity } from '../city/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    maxlength: 100,
    minlength: 10
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    maxlength: 1024,
    minlength: 20
  })
  public description!: string;

  @prop({ required: true })
  public postDate!: Date;

  @prop({
    ref: CityEntity,
    required: true,
    type: () => String
  })
  public city!: Ref<City>;

  @prop({ required: true })
  public previewImage!: string;

  @prop({
    required: true,
    type: () => [String]
  })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({
    required: true,
    min: 1,
    max: 5,
    type: () => Number
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: OFFER_TYPE
  })
  public type!: OfferType;

  @prop({
    required: true,
    min: 1,
    max: 8
  })
  public bedrooms!: number;

  @prop({
    required: true,
    min: 1,
    max: 10
  })
  public maxAdults!: number;

  @prop({
    required: true,
    min: 100,
    max: 100000
  })
  public price!: number;

  @prop({
    required: true,
    type: () => String,
    default: [],
    enum: OFFER_GOODS
  })
  public goods!: Goods[];

  @prop({ required: true })
  public location!: Location;

  @prop({
    ref: UserEntity,
    required: true,
    type: () => String
  })
  public userId!: Ref<User>;
}

export const OfferModel = getModelForClass(OfferEntity);
