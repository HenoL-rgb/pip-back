import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from './role.decorator';

@ApiTags('Roles module')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Roles('ADMIN')
  @Get()
  findMany() {
    return this.roleService.findMany();
  }

  @Roles('ADMIN')
  @Get(':id')
  findFirst(@Param('id') id: string) {
    return this.roleService.findFirst(+id);
  }

  @Roles('ADMIN')
  @Get(':value')
  findByValue(@Param('value') value: string) {
    return this.roleService.findByValue(value);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
