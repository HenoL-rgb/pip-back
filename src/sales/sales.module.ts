import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Apartment } from 'src/apartments/apartments.model';
import { Product } from 'src/products/products.model';
import { SalesController } from './sales.controller';
import { Sale } from './sales.model';
import { SalesService } from './sales.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [
    SequelizeModule.forFeature([Sale, Apartment, Product]),
    ProductsModule,
  ]
})
export class SalesModule {}
