import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';

@ApiTags('Roles module')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Public()
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findMany() {
    return this.roleService.findMany();
  }

  @Get(':id')
  findFirst(@Param('id') id: string) {
    return this.roleService.findFirst(+id);
  }

  @Get(':value')
  findByValue(@Param('value') value: string) {
    return this.roleService.findByValue(value);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
