import { Prisma } from '@prisma/client';

export type CreateAuthToken = Pick<
  Prisma.AuthTokenUncheckedCreateInput,
  'name' | 'orgs'
>;
