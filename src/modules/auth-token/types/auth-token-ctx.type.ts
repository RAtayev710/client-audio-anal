import { Prisma, PrismaClient } from '@prisma/client';

export type AuthTokenCtx = Pick<
  Prisma.AuthTokenFindFirstArgs,
  'skip' | 'take'
> & {
  orderBy?: Prisma.AuthTokenOrderByWithRelationInput;
  skipAbilityCheck?: boolean;
  transaction?: PrismaClient;
};
