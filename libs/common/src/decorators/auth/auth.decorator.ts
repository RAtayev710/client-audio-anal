import { UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../../guards';

/**
 * Decorator that combines several auth-related decorators
 */
export const Auth = () =>
  applyDecorators(
    ApiBearerAuth('token'),
    UseGuards(AuthGuard),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
  );
