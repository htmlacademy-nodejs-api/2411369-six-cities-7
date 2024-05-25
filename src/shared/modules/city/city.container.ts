import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { CityService } from './city-service.interface.js';
import { DefaultCityService } from './default-city.service.js';
import { CityEntity, CityModel } from './city.entity.js';
import { Component } from '../../types/index.js';

export function createCityContainer() {
  const cityContainer = new Container();

  cityContainer.bind<CityService>(Component.CityService).to(DefaultCityService).inSingletonScope();
  cityContainer.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);

  return cityContainer;
}

