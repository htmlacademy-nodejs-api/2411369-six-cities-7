import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

import { City, CityName, Location } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'city',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({ required: true })
  public name!: CityName;

  @prop({ required: true })
  public location!: Location;
}

export const CityModel = getModelForClass(CityEntity);
