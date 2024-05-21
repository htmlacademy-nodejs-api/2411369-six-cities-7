import { DocumentType } from '@typegoose/typegoose';

import { CreateCityDTO } from './dto/create-city.dto.js';
import { CityEntity } from './city.entity.js';

export interface CityService {
  create(dto: CreateCityDTO): Promise<DocumentType<CityEntity>>;
  findCityName(name: string): Promise<DocumentType<CityEntity> | null>;
  findOrCreate(dto: CreateCityDTO): Promise<DocumentType<CityEntity>>;
}
