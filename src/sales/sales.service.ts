import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSaleDto } from './dto/create-sale-dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './sales.model';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale) private saleRepository: typeof Sale,
    private productsService: ProductsService,
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

      const sale = await this.saleRepository.create(dto);
      await product.$set('amount', product.amount - dto.amount);

      return sale;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSales() {
    try {
      const sales = await this.saleRepository.findAll();
      return sales;
    } catch (error) {
      console.log(error);
    }
  }

  async getSaleById(saleId: number) {
    try {
      const sale = await this.saleRepository.findByPk(saleId);
      return sale;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSale(saleId: number) {
    try {
      const sale = await this.saleRepository.destroy({
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
      const sale = await this.saleRepository.update(dto, {
        where: {
          id,
        },
      });

      return sale;
    } catch (error) {
      console.log(error);
    }
  }
}
