import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductService } from './product.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ProductResolver, ProductService],
  imports: [PrismaModule, AuthModule],
})
export class ProductModule {}
