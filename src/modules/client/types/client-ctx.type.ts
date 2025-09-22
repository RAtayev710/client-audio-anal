import { Prisma, PrismaClient } from '@prisma/client';

export type ClientCtx = Pick<
  Prisma.ClientFindFirstArgs,
  'include' | 'skip' | 'take'
> & {
  orderBy?: Prisma.ClientOrderByWithRelationInput;
  skipAbilityCheck?: boolean;
  transaction?: PrismaClient;
};
