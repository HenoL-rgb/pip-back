import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CitiesModule } from './cities/cities.module';
import { PositionsModule } from './positions/positions.module';
import { SalesModule } from './sales/sales.module';

import { RoleModule } from './role/role.module';

import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './role/role.guard';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    EmployeesModule,
    ApartmentsModule,
    ProductsModule,
    CitiesModule,
    PositionsModule,
    SalesModule,
    RoleModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
