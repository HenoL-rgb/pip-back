import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.create(createRoleDto);
  }

  findAll() {
    return this.roleRepository.findAll();
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id } });
  }

  findByValue(value: string) {
    return this.roleRepository.findOne({
      where: {
        name: value,
      },
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(updateRoleDto, {
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.roleRepository.destroy({
      where: { id },
    });
  }
}
