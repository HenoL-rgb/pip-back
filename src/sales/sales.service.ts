import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { CreateSaleDto } from './dto/create-sale-dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';

@Injectable()
export class SalesService {
  constructor(
    private productsService: ProductsService,
    private prisma: PrismaService,
  ) {}

  async createSale(dto: CreateSaleDto) {
    try {
      const product = await this.productsService.getProductById(dto.productId);
      if (product.amount < dto.amount) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: 'Not Enough Stock',
            message: 'Available amount is lower than needed',
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const sale = await this.prisma.sale.create({ data: dto });
      await this.productsService.updateProduct(product.id, {
        amount: product.amount - dto.amount,
      });

      return sale;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSales({ limit, offset }: PaginationDto) {
    try {
      const options: { skip: number; take?: number } = {
        skip: +offset || 0,
      };
      if (limit) {
        options.take = +limit;
      }
      const sales = await this.prisma.sale.findMany(options);
      return sales;
    } catch (error) {
      console.log(error);
    }
  }

  async getSaleById(saleId: number) {
    try {
      const sale = await this.prisma.sale.findUnique({ where: { id: saleId } });
      return sale;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSale(saleId: number) {
    try {
      const sale = await this.prisma.sale.delete({
        where: {
          id: saleId,
        },
      });

      return sale;
    } catch (error) {
      console.log(error);
    }
  }

  async updateSale(id: number, dto: UpdateSaleDto) {
    try {
      const sale = await this.prisma.sale.update({
        where: {
          id,
        },
        data: dto,
      });

      return sale;
    } catch (error) {
      console.log(error);
    }
  }
}
