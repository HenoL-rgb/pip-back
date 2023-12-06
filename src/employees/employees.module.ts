import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Apartment } from 'src/apartments/apartments.model';
import { Position } from 'src/positions/position.model';
import { EmployeesController } from './employees.controller';
import { Employee } from './employees.model';
import { EmployeesService } from './employees.service';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/role/user-roles.model';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([
      Employee,
      Apartment,
      Position,
      Role,
      UserRoles,
    ]),
    RoleModule,
  ],
  exports: [EmployeesService],
})
export class EmployeesModule {}
