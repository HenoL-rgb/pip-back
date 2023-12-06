import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from 'src/cities/cities.model';
import { Apartment } from './apartments.model';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel(Apartment) private apartmentRepository: typeof Apartment,
  ) {}

  async createApartment(dto: CreateApartmentDto) {
    try {
      const apartment = await this.apartmentRepository.create(dto);
      return apartment;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllApartments() {
    try {
      const apartments = await this.apartmentRepository.findAll({
        include: City,
      });
      return apartments;
    } catch (error) {
      console.log(error);
    }
  }

  async getApartmentById(apartmentId: number) {
    try {
      const apartment = await this.apartmentRepository.findByPk(apartmentId, {
        include: City,
      });
      return apartment;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteApartment(apartmentId: number) {
    try {
      const apartment = await this.apartmentRepository.destroy({
        where: {
          id: apartmentId,
        },
      });

      return apartment;
    } catch (error) {
      console.log(error);
    }
  }

  async updateApartment(id: number, dto: UpdateApartmentDto) {
    try {
      const apartment = await this.apartmentRepository.update(dto, {
        where: {
          id,
        },
      });

      return apartment;
    } catch (error) {
      console.log(error);
    }
  }
}
