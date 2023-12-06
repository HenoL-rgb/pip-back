import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employees.model';
import { EmployeesService } from './employees.service';

@ApiTags('Employee module')
@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) {}

    @ApiOperation({summary: 'Creating Employee'})
    @ApiResponse({status: 200, type: Employee})
    @UsePipes(ValidationPipe)
    @Post()
    createEmployee(@Body() dto: CreateEmployeeDto) {
        return this.employeesService.createEmployee(dto)
    }

    @ApiOperation({summary: 'Get all employees'})
    @ApiResponse({status: 200, type: [Employee]})
    @Get()
    getAllEmployees() {
        return this.employeesService.getAllEmployees()
    }

    @ApiOperation({summary: 'Get Employee by id'})
    @ApiResponse({status: 200, type: Employee})
    @Get(':id')
    getEmployeeById(@Param('id') id: number) {
        return this.employeesService.getEmployeeById(id)
    }

    @ApiOperation({summary: 'Delete Employee'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    deleteEmployee(@Param('id') id: number) {
        return this.employeesService.deleteEmployee(id)
    }

    @ApiOperation({summary: 'Update employee'})
    @ApiResponse({status: 200, type: Number})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    updateEmployee(@Param('id') id: number, @Body() dto: UpdateEmployeeDto) {
        return this.employeesService.updateEmployee(id, dto)
    }
}
