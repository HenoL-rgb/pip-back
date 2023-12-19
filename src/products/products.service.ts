import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({ data: { ...dto } });
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts({ limit, offset }: PaginationDto) {
    try {
      const options: { skip: number; take?: number } = {
        skip: +offset || 0,
      };
      if (limit) {
        options.take = +limit;
      }
      const products = await this.prisma.product.findMany(options);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(productId: number) {
    try {
      const product = await this.prisma.product.delete({
        where: {
          id: productId,
        },
      });

      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    try {
      const product = await this.prisma.product.update({
        where: {
          id,
        },
        data: dto,
      });

      return product;
    } catch (error) {
      console.log(error);
    }
  }
}
