import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export const GetUser = createParamDecorator(
  (
    data: (keyof UserEntity)[] | keyof UserEntity | undefined,
    context: ExecutionContext,
  ): UserEntity | Partial<UserEntity> | string => {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new InternalServerErrorException('User not found.');
    }

    if (data instanceof Array) {
      return (
        user && data.reduce((acc, key) => ({ ...acc, [key]: user[key] }), {})
      );
    }

    if (data && typeof data === 'string') {
      return user && user[data];
    }

    return user;
  },
);
