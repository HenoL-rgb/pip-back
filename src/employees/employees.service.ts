import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from 'src/role/role.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private prisma: PrismaService,
    private roleService: RoleService,
  ) {}

  async createEmployee(dto: CreateEmployeeDto) {
    try {
      const hashedPass = await bcrypt.hash(dto.password, 5);
      const role = await this.roleService.findByValue('USER');
      const employee = await this.prisma.employee.create({
        data: {
          ...dto,
          password: hashedPass,
          roles: {
            connect: [{ id: role.id }],
          },
        },
      });
      return employee;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllEmployees() {
    try {
      const employees = await this.prisma.employee.findMany({
        select: {
          id: true,
          apartment: true,
          name: true,
          surname: true,
          age: true,
          position: true,
          email: true,
        }
      });
      return employees;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeById(employeeId: number) {
    try {
      const { password, refreshToken, ...employee } = await this.prisma.employee.findUnique({
        where: { id: employeeId },
        include: {
          roles: {
            select: {
              name: true,
            },
          },
          apartment: true,
          position: true,
        },
      });

      return employee;

    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeRefreshToken(employeeId: number) {
    try {
      const { refreshToken } = await this.prisma.employee.findUnique({
        where: { id: employeeId },
        include: {
          roles: {
            select: {
              name: true,
            },
          },
          apartment: true,
          position: true,
        },
      });

      return refreshToken;

    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeByEmail(email: string) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        email,
      },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
        apartment: true,
        position: true,
      },
    });

    return employee;
  }

  async deleteEmployee(employeeId: number) {
    try {
      const employee = await this.prisma.employee.delete({
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
      const employee = await this.prisma.employee.update({
        where: {
          id,
        },
        data: dto,
      });

      return employee;
    } catch (error) {
      console.log(error);
    }
  }
}
