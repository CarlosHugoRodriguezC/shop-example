import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateProductInput } from './dtos/inputs';
import { UpdateProductInput } from './dtos/inputs/update-product.input';
import { ProductListResponse, ProductResponse } from './types';
import { AuthGql } from 'src/auth/decorators';
import { PaginationArgs } from 'src/common/dtos/args/pagination.args';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Query(() => ProductListResponse)
  findAll(@Args() paginationArgs: PaginationArgs) {
    return this.productService.findAll(paginationArgs);
  }

  @Query(() => ProductResponse)
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => ProductResponse)
  @AuthGql()
  create(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Mutation(() => ProductResponse)
  update(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(id, updateProductInput);
  }

  @Mutation(() => ProductResponse)
  remove(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
