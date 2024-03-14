import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();

    Object.assign(
      this,
      this.$extends({
        query: {
          user: {
            create: ({ args, model, operation, query }) => {
              const {
                data: { email },
              } = args;

              const formattedEmail = email.toLowerCase().trim();

              return query({
                ...args,
                data: {
                  ...args.data,
                  email: formattedEmail,
                },
              });
            },
          },
        },
      }),
    );
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
