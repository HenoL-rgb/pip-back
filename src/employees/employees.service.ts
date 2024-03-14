//@ts-nocheck
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from 'src/role/role.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';

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

  async getAllEmployees({ limit, offset }: PaginationDto) {
    try {
      const options: {
        select: {
          id: true;
          apartment: true;
          name: true;
          surname: true;
          age: true;
          position: true;
          email: true;
        };
        skip?: number;
        take?: number;
      } = {
        select: {
          id: true,
          apartment: true,
          name: true,
          surname: true,
          age: true,
          position: true,
          email: true,
        },
        skip: +offset || 0,
      };

      if (limit) {
        options.take = +limit;
      }

      const employees = await this.prisma.employee.findMany(options);
      return employees;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeeById(employeeId: number) {
    try {
      const { password, refreshToken, ...employee } =
        await this.prisma.employee.findUnique({
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
      let data = { ...dto };
      if (data.apartment) {
        const apartment = await this.prisma.apartment.findUnique({
          where: { id: +data.apartment },
        });
        const { apartment: garb, ...rest } = data;
        data = { ...rest, apartmentId: apartment.id };
      }
      console.log(data)
      const employee = await this.prisma.employee.update({
        where: {
          id,
        },
        data: data,
      });

      return employee;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmployeesByPosition(position: string) {
    try {
      const isPosition = await this.prisma.position.findFirst({
        where: {
          name: position,
        },
      });
      if (isPosition) {
        const employees = await this.prisma.employee.findMany({
          where: {
            positionId: isPosition.id,
          },
        });
        return employees;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Bad request',
            message: 'Position doesnt exist',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
