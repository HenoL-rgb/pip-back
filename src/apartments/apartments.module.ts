import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from 'src/cities/cities.model';
import { Employee } from 'src/employees/employees.model';
import { Sale } from 'src/sales/sales.model';
import { ApartmentsController } from './apartments.controller';
import { Apartment } from './apartments.model';
import { ApartmentsService } from './apartments.service';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
  imports: [
    SequelizeModule.forFeature([City, Apartment, Employee, Sale])
  ]
})
export class ApartmentsModule {}
