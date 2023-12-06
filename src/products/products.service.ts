import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async createProduct(dto: CreateProductDto) {
    try {
      const product = await this.productRepository.create(dto);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts() {
    try {
      const products = await this.productRepository.findAll();
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId: number) {
    try {
      const product = await this.productRepository.findByPk(productId);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(productId: number) {
    try {
      const product = await this.productRepository.destroy({
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
      const product = await this.productRepository.update(dto, {
        where: {
          id,
        },
      });

      return product;
    } catch (error) {
      console.log(error);
    }
  }
}
