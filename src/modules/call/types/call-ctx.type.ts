import { Prisma, PrismaClient } from '@prisma/client';

export type CallCtx = Pick<Prisma.CallFindFirstArgs, 'skip' | 'take'> & {
  orderBy?: Prisma.CallOrderByWithRelationInput;
  skipAbilityCheck?: boolean;
  transaction?: PrismaClient;
};
