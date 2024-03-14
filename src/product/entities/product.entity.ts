import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from '@prisma/client';
import { ProductStatusEnum } from '../enums/product-status.enum';

@ObjectType()
export class ProductEntity implements Product {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [String])
  tags: string[];

  @Field(() => ProductStatusEnum)
  status: ProductStatusEnum;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;

  @Field(() => Date, { nullable: true })
  deletedAt: Date | null;
}
