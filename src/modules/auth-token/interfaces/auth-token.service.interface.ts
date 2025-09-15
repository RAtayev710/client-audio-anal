import { AuthToken, Prisma } from '@prisma/client';

import { IBaseCRUDService } from '@lib/common/interfaces';

import { AuthTokenCtx, CreateAuthToken, UpdateAuthToken } from '../types';

export type IAuthTokenService = IBaseCRUDService<
  CreateAuthToken,
  UpdateAuthToken,
  Prisma.AuthTokenWhereInput,
  AuthToken,
  AuthTokenCtx
>;
