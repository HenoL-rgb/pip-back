import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { Roles } from 'src/role/role.decorator';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';
import { Public } from 'src/auth/public.decorator';

@ApiTags('Employee module')
@ApiBearerAuth()
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
  getAllEmployees(@Query() pagination?: PaginationDto) {
    return this.employeesService.getAllEmployees(pagination);
  }

  @ApiOperation({ summary: 'Get Employee by id' })
  @Get(':id')
  getEmployeeById(@Param('id') id: number) {
    return this.employeesService.getEmployeeById(id);
  }

  @ApiOperation({summary: 'Get employee by position'})
  @Get(':id')
  getEmployeesByPosition(@Query() query: string) {
    return this.employeesService.getEmployeesByPosition(query)
  }

  @ApiOperation({ summary: 'Delete Employee' })
  @ApiResponse({ status: 200, type: Number })
  @Roles('ADMIN')
  @Delete(':id')
  deleteEmployee(@Param('id') id: number) {
    return this.employeesService.deleteEmployee(id);
  }

  @ApiOperation({ summary: 'Update employee' })
  @ApiResponse({ status: 200, type: Number })
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  @Patch(':id')
  updateEmployee(@Param('id') id: number, @Body() dto: UpdateEmployeeDto) {
    return this.employeesService.updateEmployee(id, dto);
  }
}
