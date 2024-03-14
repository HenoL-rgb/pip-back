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
        include: { city: boolean; sales: any; employees: boolean };
        skip?: number;
        take?: number;
      } = {
        include: {
          city: true,
          sales: {
            include: {
              product: true,
            },
          },
          employees: true,
        },
        skip: +offset || 0,
      };

      if (limit) {
        options.take = +limit;
      }

      const apartments = await this.prisma.apartment.findMany(options);

      const apartmentsByCity = {};
      apartments.forEach((apartment) => {
        if (!apartmentsByCity[apartment.city.name]) {
          apartmentsByCity[apartment.city.name] = {};
          apartmentsByCity[apartment.city.name].apartments = [];
        }
        apartmentsByCity[apartment.city.name].apartments.push(apartment);
      });

      for (const city in apartmentsByCity) {
        let salesAmount = 0;
        const sales = {};
        for (const apartment of apartmentsByCity[city].apartments) {
          for (const sale of apartment.sales) {
            salesAmount++;
            //@ts-ignore
            if (!sales[sale.product.name]) {
              //@ts-ignore

              sales[sale.product.name] = sale.amount;
            } else {
              //@ts-ignore
              sales[sale.product.name] += sale.amount;
            }
          }
        }
        apartmentsByCity[city].sales = sales;
        apartmentsByCity[city].salesAmount = salesAmount;
        apartmentsByCity[city].totalAmount = Object.values(sales).reduce(
          (acc, item) => {
            //@ts-ignore
            return acc + item;
          },
          0,
        );
        console.log(sales);
      }

      const res = [];

      for(const app in apartmentsByCity) {
        res.push({city: app, ...apartmentsByCity[app], sales: Object.entries(apartmentsByCity[app].sales).map(([name, amount]) => ({productName: name, amount}))})
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async getApartments() {
    return this.prisma.apartment.findMany();
  }

  

  async getApartmentById(apartmentId: number) {
    try {
      const apartment = await this.prisma.apartment.findUnique({
        where: {
          id: apartmentId,
        },
        include: {
          city: true,
          sales: true,
          employees: true,
        },
      });

      const groupedSales = apartment.sales.reduce((acc, sale) => {
        const saleDate = new Date(sale.date).toLocaleString('en-GB'); // Format date as 'DD/MM/YYYY'
        const existingGroup = acc.find(group => group.date === saleDate);
        if (existingGroup) {
            const existingProduct = existingGroup.products.find(product => product.productId === sale.productId);
            if (existingProduct) {
                existingProduct.amount += sale.amount;
            } else {
                existingGroup.products.push({ productId: sale.productId, amount: sale.amount });
            }
        } else {
            acc.push({ date: saleDate, products: [{ productId: sale.productId, amount: sale.amount }] });
        }
        return acc;
    }, []);

      return {...apartment, salesForChart: groupedSales};
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

  async getApartmentsFullness() {
    const apartments = await this.prisma.apartment.findMany({
      include: {
        employees: true,
      },
    });

    const mappedApartments = apartments.map((apartment) => {
      const { employees, ...apartmentWithoutEmployees } = apartment;
      return {
        ...apartmentWithoutEmployees,
        employeesAmount: employees.length,
      };
    });

    return mappedApartments;
  }
}
