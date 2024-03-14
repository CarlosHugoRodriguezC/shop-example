import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { UserValidRole } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { JwtAuthGuardGql } from '../guards/jwt-auth-gql.guard';

export const AuthGql = (...roles: UserValidRole[]) => {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(JwtAuthGuardGql, UserRoleGuard),
  );
};
