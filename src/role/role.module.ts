import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.model';
import { UserRoles } from './user-roles.model';
import { Employee } from 'src/employees/employees.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, Employee, UserRoles])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
