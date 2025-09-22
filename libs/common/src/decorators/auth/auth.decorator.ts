import { UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiHeader,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { X_ORG_ID_HEADER } from '@lib/common/constants';

import { AuthGuard } from '../../guards';

/**
 * Decorator that combines several auth-related decorators
 */
export const Auth = () =>
  applyDecorators(
    ApiBearerAuth('token'),
    UseGuards(AuthGuard),
    ApiUnauthorizedResponse(),
    ApiHeader({ name: X_ORG_ID_HEADER, required: true }),
    ApiForbiddenResponse(),
  );
