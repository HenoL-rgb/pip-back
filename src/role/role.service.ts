import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  create(createRoleDto: CreateRoleDto) {
    return this.prisma.roles.create({ data: createRoleDto });
  }

  findMany() {
    return this.prisma.roles.findMany();
  }

  findFirst(id: number) {
    return this.prisma.roles.findUnique({ where: { id } });
  }

  findByValue(value: string) {
    return this.prisma.roles.findFirst({
      where: {
        name: value,
      },
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.roles.update({
      where: {
        id,
      },
      data: updateRoleDto,
    });
  }

  remove(id: number) {
    return this.prisma.roles.delete({
      where: { id },
    });
  }
}
