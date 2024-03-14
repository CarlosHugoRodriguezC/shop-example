import { registerEnumType } from '@nestjs/graphql';

export enum ProductStatusEnum {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

registerEnumType(ProductStatusEnum, {
  name: 'ProductStatusEnum',
  description: 'Status of the product',
});
