import { Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
        console.log(result);

        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles.map(role => role.name) };
    
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });

    await this.employeesService.updateEmployee(user.id, {
      refreshToken,
    });

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,  
      }),
    };
  }
}
