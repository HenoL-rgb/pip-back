import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CitiesModule } from './cities/cities.module';
import { PositionsModule } from './positions/positions.module';
import { SalesModule } from './sales/sales.module';
import { Apartment } from './apartments/apartments.model';
import { Position } from './positions/position.model';
import { Product } from './products/products.model';
import { Sale } from './sales/sales.model';
import { Employee } from './employees/employees.model';
import { City } from './cities/cities.model';
import { RoleModule } from './role/role.module';
import { UserRoles } from './role/user-roles.model';
import { Role } from './role/role.model';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      models: [
        Apartment,
        Product,
        Position,
        Sale,
        Employee,
        City,
        UserRoles,
        Role,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    EmployeesModule,
    ApartmentsModule,
    ProductsModule,
    CitiesModule,
    PositionsModule,
    SalesModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
