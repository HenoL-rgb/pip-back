import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { ProductsModule } from 'src/products/products.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [ProductsModule, PrismaModule],
})
export class SalesModule {}
