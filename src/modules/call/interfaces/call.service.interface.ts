import { Call, Prisma } from '@prisma/client';

import { IBaseCRUDService } from '@lib/common/interfaces';

import { UploadCallInfoRequest } from '../dto';
import { CallCtx, CreateCall, UpdateCall } from '../types';

export type ICallService = IBaseCRUDService<
  CreateCall,
  UpdateCall,
  Prisma.CallWhereInput,
  Call,
  CallCtx
> & {
  uploadInfo(data: UploadCallInfoRequest): Promise<Call>;
};
