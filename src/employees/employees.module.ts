import { Module } from '@nestjs/common';
import { RoleModule } from 'src/role/role.module';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [RoleModule, PrismaModule],
  exports: [EmployeesService],
})
export class EmployeesModule {}
