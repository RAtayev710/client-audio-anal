import { Client, Prisma } from '@prisma/client';

import { IBaseCRUDService } from '@lib/common/interfaces';

import { ClientCtx, CreateClient, UpdateClient } from '../types';

export type IClientService = IBaseCRUDService<
  CreateClient,
  UpdateClient,
  Prisma.ClientWhereInput,
  Client,
  ClientCtx
>;
