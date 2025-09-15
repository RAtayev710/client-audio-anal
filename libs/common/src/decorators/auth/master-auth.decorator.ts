import { UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { X_MASTER_TOKEN_HEADER } from '@lib/common/constants';

import { MasterAuthGuard } from '../../guards';

/**
 * Decorator that combines several auth-related decorators
 */
export const MasterAuth = () =>
  applyDecorators(
    ApiHeader({ name: X_MASTER_TOKEN_HEADER }),
    UseGuards(MasterAuthGuard),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
  );
