import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({ data: dto });
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts() {
    try {
      const products = await this.prisma.product.findMany();
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
