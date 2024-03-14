import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';

export const usersFactory = async (prisma: PrismaClient) => {
  const usersPromises = Array.from({ length: 10 }).map((_, i) => {
    const email = faker.internet.email();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = bcrypt.hashSync('pass_good', 10);

    return prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password,
      },
    });
  });

  const users = await Promise.all([...usersPromises]);

  return users;
};
