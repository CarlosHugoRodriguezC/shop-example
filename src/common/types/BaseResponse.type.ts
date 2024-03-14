import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function BaseResponse<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class BaseResponseClass {
    @Field(() => Int, { nullable: true })
    statusCode?: number;

    @Field(() => Boolean)
    success: boolean;

    @Field(() => String, { nullable: true })
    message?: string;

    @Field(() => classRef, { nullable: true })
    data?: T;

    @Field(() => [String], { nullable: true })
    errors?: string[];
  }
  return BaseResponseClass;
}

export function BaseListResponse<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class BaseResponseListClass {
    @Field(() => Int, { nullable: true })
    statusCode?: number;

    @Field(() => Boolean)
    success: boolean;

    @Field(() => String, { nullable: true })
    message?: string;

    @Field(() => [classRef], { nullable: true })
    data?: T[];

    @Field(() => [String], { nullable: true })
    errors?: string[];
  }

  return BaseResponseListClass;
}
