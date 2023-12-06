import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employees.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
  ) {}

  async createEmployee(dto: CreateEmployeeDto) {
    try {
      const hashedPass = await bcrypt.hash(dto.password, 5);
      const employee = await this.employeeRepository.create({...dto, password: hashedPass});
      return employee;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllEmployees() {
    try {
      const employees = await this.employeeRepository.findAll();
      return employees;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeById(employeeId: number) {
    try {
      const employee = await this.employeeRepository.findByPk(employeeId);
      return employee;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeByEmail(email: string) {
    return await this.employeeRepository.findOne({
      where: {
        email,
      },
    });
  }

  async deleteEmployee(employeeId: number) {
    try {
      const employee = await this.employeeRepository.destroy({
        where: {
          id: employeeId,
        },
      });

      return employee;
    } catch (error) {
      console.log(error);
    }
  }

  async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    try {
      const employee = await this.employeeRepository.update(dto, {
        where: {
          id,
        },
      });

      return employee;
    } catch (error) {
      console.log(error);
    }
  }
}
