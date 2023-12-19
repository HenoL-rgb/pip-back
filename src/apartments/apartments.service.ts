import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';

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

  async getAllApartments({ limit, offset }: PaginationDto) {
    try {
      const options: {
        include: { city: boolean };
        skip?: number;
        take?: number;
      } = {
        include: {
          city: true,
        },
        skip: +offset || 0,
      };

      if (limit) {
        options.take = +limit;
      }

      const apartments = await this.prisma.apartment.findMany(options);
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

  async getApartmentStats(id: number) {
    const products = this.prisma.product.findMany({
      where: {
        apartmentId: id,
      },
    });
    const sales = this.prisma.sale.findMany({
      where: {
        apartmentId: id,
      },
    });
    const employees = this.prisma.employee.findMany({
      where: {
        apartmentId: id,
      },
    });
  }
}
