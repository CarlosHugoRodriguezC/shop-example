import { PrismaClient, $Enums } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const productsFactory = async (prisma: PrismaClient) => {
  const productsPromises = Array.from({ length: 10 }).map((_, i) => {
    const name = faker.commerce.productName();
    const slug = name.toLowerCase().split(' ').join('-');
    const description = faker.commerce.productDescription();
    const tags = [faker.commerce.productAdjective()];
    const status = faker.helpers.arrayElement<$Enums.ProductStatus>([
      'DRAFT',
      'PUBLISHED',
      'OUT_OF_STOCK',
    ]);

    return prisma.product.create({
      data: { name, slug, description, tags, status },
    });
  });

  const products = await Promise.all([...productsPromises]);

  return products;
};
