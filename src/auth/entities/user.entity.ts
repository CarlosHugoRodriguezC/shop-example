import { User } from '@prisma/client';
import { UserValidRole } from '../interfaces';

export class UserEntity implements User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  avatar: string | null;
  isActive: boolean;
  roles: UserValidRole[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
