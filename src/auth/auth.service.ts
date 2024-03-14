import { Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as jsonwebtoken from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.employeesService.getEmployeeByEmail(email);

    if (user) {
      const passwordEquals = await bcrypt.compare(pass, user.password);

      if (passwordEquals) {
        const { password, ...result } = user;

        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      userId: user.id,
      roles: user.roles.map((role) => role.name),
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: 3600,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: 360000,
    });

    await this.employeesService.updateEmployee(user.id, {
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
      roles: payload.roles
    };
  }

  async refresh(req: Request) {
    try {
      const refreshToken = req.headers.authorization.split(' ')[1];

      const { userId, email, roles } = jsonwebtoken.verify(
        req.headers.authorization.split(' ')[1],
        process.env.JWT_REFRESH_SECRET_KEY,
        { complete: true },
      ).payload as { userId: number; email: string; roles: string[] };
      const usersRefresh = await this.employeesService.getEmployeeRefreshToken(
        userId,
      );

      const mappedRoles = roles.map((role) => ({ name: role }));

      if (refreshToken === usersRefresh) {
        return this.login({
          email,
          roles: mappedRoles,
          id: userId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
