import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductInput } from './dtos/inputs';
import { UpdateProductInput } from './dtos/inputs/update-product.input';
import { ProductListResponse, ProductResponse } from './types';
import { ProductEntity } from './entities/product.entity';
import { getDBErrorMessage } from 'src/common/constants/error-codes.constant';
import { PaginationArgs } from 'src/common/dtos/args/pagination.args';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly prismaService: PrismaService) { }
  async findAll(paginationArgs: PaginationArgs): Promise<ProductListResponse> {
    try {
      const products = await this.prismaService.product.findMany({
        skip: paginationArgs.offset,
        take: paginationArgs.limit,
      });

      console.log(products);

      return {
        data: products as ProductEntity[],
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findOne(id: string): Promise<ProductResponse> {
    const product = await this.findProduct(id);

    return {
      data: product as ProductEntity,
      success: true,
      statusCode: 200,
    };
  }

  async create(
    createProductInput: CreateProductInput,
  ): Promise<ProductResponse> {
    const { slug: _slug } = createProductInput;

    const slug = !!_slug
      ? _slug
      : createProductInput.name.toLowerCase().replace(/ /g, '-');

    try {
      const product = await this.prismaService.product.create({
        data: {
          ...createProductInput,
          slug,
        },
      });

      return {
        data: product as ProductEntity,
        success: true,
        statusCode: 201,
      };
    } catch (error) {
      return this.handleErrors(error);
    }
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<ProductResponse> {
    const product = await this.findProduct(id);

    try {
      const productUpdated = await this.prismaService.product.update({
        where: {
          id: product.id,
        },
        data: {
          ...updateProductInput,
        },
      });

      return {
        data: productUpdated as ProductEntity,
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      return this.handleErrors(error);
    }
  }

  async remove(id: string): Promise<ProductResponse> {
    const product = await this.findProduct(id);

    try {
      await this.prismaService.product.delete({
        where: {
          id: product.id,
        },
      });

      return {
        data: product as ProductEntity,
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      return this.handleErrors(error);
    }
  }

  private async findProduct(id: string): Promise<ProductEntity> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ${id} not found`);
    }

    return product as ProductEntity;
  }

  private handleErrors(error: any): ProductResponse {
    this.logger.error(error);
    if (error.code?.startsWith('P')) {
      const message = getDBErrorMessage(error.code, error.meta.target);
      throw new BadRequestException(message);
    }

    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
