import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/role/role.decorator';

@ApiTags('Employee module')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @ApiOperation({ summary: 'Creating Employee' })
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  @Post()
  createEmployee(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.createEmployee(dto);
  }

  @ApiOperation({ summary: 'Get all employees' })
  @Get()
  getAllEmployees() {
    return this.employeesService.getAllEmployees();
  }

  @ApiOperation({ summary: 'Get Employee by id' })
  @Get(':id')
  getEmployeeById(@Param('id') id: number) {
    return this.employeesService.getEmployeeById(id);
  }

  @ApiOperation({ summary: 'Delete Employee' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  deleteEmployee(@Param('id') id: number) {
    return this.employeesService.deleteEmployee(id);
  }

  @ApiOperation({ summary: 'Update employee' })
  @ApiResponse({ status: 200, type: Number })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  updateEmployee(@Param('id') id: number, @Body() dto: UpdateEmployeeDto) {
    return this.employeesService.updateEmployee(id, dto);
  }
}
