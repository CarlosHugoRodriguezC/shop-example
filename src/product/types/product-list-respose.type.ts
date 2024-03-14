import { BaseListResponse } from 'src/common/types/BaseResponse.type';
import { ProductEntity } from '../entities/product.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductListResponse extends BaseListResponse(ProductEntity) {}
