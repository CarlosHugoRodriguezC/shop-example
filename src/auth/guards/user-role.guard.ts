import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/auth/entities/user.entity';
import { META_ROLES } from '../decorators';
import { UserValidRole } from '../interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles) return true;
    if (!validRoles.length) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as UserEntity;

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return validRoles.some((role) =>
      user.roles.includes(role as UserValidRole),
    );
  }
}
