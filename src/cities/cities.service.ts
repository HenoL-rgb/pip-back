import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './cities.model';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City) private cityRepository: typeof City) {}

  async createCity(dto: CreateCityDto) {
    try {
      const city = await this.cityRepository.create(dto);
      return city;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCities() {
    try {
      const cities = await this.cityRepository.findAll();
      return cities;
    } catch (error) {
      console.log(error);
    }
  }

  async getCityById(cityId: number) {
    try {
      const city = await this.cityRepository.findByPk(cityId);
      return city;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCity(cityId: number) {
    try {
      const city = await this.cityRepository.destroy({
        where: {
          id: cityId,
        },
      });

      return city;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCity(id: number, dto: UpdateCityDto) {
    try {
      const city = await this.cityRepository.update(dto, {
        where: {
          id,
        },
      });

      return city;
    } catch (error) {
      console.log(error);
    }
  }
}
