import { Field, InputType } from '@nestjs/graphql';
import { ProductStatus } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { ProductStatusEnum } from 'src/product/enums/product-status.enum';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  slug?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @Field(() => ProductStatusEnum, { nullable: true })
  @IsString()
  @IsOptional()
  status?: ProductStatusEnum;
}
