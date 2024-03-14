import { PrismaClient } from '@prisma/client';
import { productsFactory, usersFactory } from './factories';

const prisma = new PrismaClient();

const main = async () => {
  const users = await usersFactory(prisma);
  const products = await productsFactory(prisma);

  console.log(`${users.length} users created`);
  console.log(`${products.length} products created`);
  console.log('Seed completed');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
