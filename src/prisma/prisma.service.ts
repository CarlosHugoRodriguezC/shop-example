import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { assert } from 'console';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
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
}
