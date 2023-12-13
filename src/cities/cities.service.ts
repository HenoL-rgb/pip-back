import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async createCity(dto: CreateCityDto) {
    try {
      const city = await this.prisma.city.create({ data: dto });
      return city;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCities() {
    try {
      const cities = await this.prisma.city.findMany();
      return cities;
    } catch (error) {
      console.log(error);
    }
  }

  async getCityById(cityId: number) {
    try {
      const city = await this.prisma.city.findUnique({ where: { id: cityId } });
      return city;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCity(cityId: number) {
    try {
      const city = await this.prisma.city.delete({
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
      const city = await this.prisma.city.update({
        where: {
          id,
        },
        data: dto,
      });

      return city;
    } catch (error) {
      console.log(error);
    }
  }
}
