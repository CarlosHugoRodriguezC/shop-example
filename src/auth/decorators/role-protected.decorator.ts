import { SetMetadata } from '@nestjs/common';
import { UserValidRole } from '../interfaces';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: UserValidRole[]) => {
  return SetMetadata(META_ROLES, args);
};
