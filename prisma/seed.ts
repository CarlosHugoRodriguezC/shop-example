import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

const main = async () => {
  const users = await prisma.user.upsert({
    where: { email: 'test@mail.com' },
    update: {},
    create: {
      email: 'test@mail.com',
      firstName: 'Test',
      lastName: 'User',
      password: hashSync('pass_good', 10),
    },
  });

  console.log({ users });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
