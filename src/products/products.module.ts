import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sale } from 'src/sales/sales.model';
import { ProductsController } from './products.controller';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Product, Sale])],
  exports: [ProductsService],
})
export class ProductsModule {}
