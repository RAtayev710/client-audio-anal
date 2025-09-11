import { SetMetadata } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

import { DTO_KEY } from '../constants';

/**
 * Decorator that defines response dto class in metadata.
 * @param {ClassConstructor<unknown>} arg - The dto class constructor.
 */
export const Dto = (arg: ClassConstructor<unknown>) =>
  SetMetadata(DTO_KEY, arg);
