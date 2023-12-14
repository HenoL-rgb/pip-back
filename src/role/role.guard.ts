import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { JwtService } from '@nestjs/jwt';
import * as jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    try {
      const { roles: userRoles } = jsonwebtoken.verify(
        req.headers.authorization.split(' ')[1],
        process.env.JWT_SECRET_KEY,
        { complete: true },
      ).payload as { roles: string[] };
      console.log(requiredRoles);

      return requiredRoles.some((role) => userRoles?.includes(role));
    } catch (e) {
      console.log(e);
      return false;
    }

    //return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
