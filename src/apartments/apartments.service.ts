import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(private prisma: PrismaService) {}

  async createApartment(dto: CreateApartmentDto) {
    try {
      const apartment = await this.prisma.apartment.create({ data: dto });
      return apartment;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllApartments() {
    try {
      const apartments = await this.prisma.apartment.findMany({
        include: {
          city: true,
        },
      });
      return apartments;
    } catch (error) {
      console.log(error);
    }
  }

  async getApartmentById(apartmentId: number) {
    try {
      const apartment = await this.prisma.apartment.findUnique({
        where: {
          id: apartmentId,
        },
        include: {
          city: true,
        },
      });
      return apartment;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteApartment(apartmentId: number) {
    try {
      const apartment = await this.prisma.apartment.delete({
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
      const apartment = await this.prisma.apartment.update({
        where: {
          id,
        },
        data: dto,
      });

      return apartment;
    } catch (error) {
      console.log(error);
    }
  }
}
