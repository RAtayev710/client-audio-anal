import { Prisma } from '@prisma/client';

export type CreateCall = Pick<
  Prisma.CallUncheckedCreateInput,
  | 'callId'
  | 'clientPhone'
  | 'datetime'
  | 'direction'
  | 'duration'
  | 'managerName'
  | 'managerPhone'
  | 'orgId'
> & { transcribation?: object };
