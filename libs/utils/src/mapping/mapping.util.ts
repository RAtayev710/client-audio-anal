import { plainToInstance } from 'class-transformer';

import { MappingCtx } from './mapping.type';

/**
 * Utility class for mapping data to DTOs (Data Transfer Objects).
 */
export class MappingUtil {
  /**
   * Maps a single data object to a DTO using the provided mapping context.
   * @template T - The type of the original data object.
   * @template C - The type of the DTO (Data Transfer Object).
   * @param {T} data - The data object to map to a DTO.
   * @param {MappingCtx<C>} mappingCtx - The mapping context containing options and the DTO class.
   * @returns {C} The mapped DTO.
   */
  static toDto<T, C>(data: T, { options, cls }: MappingCtx<C>): C;
  /**
   * Maps an array of data objects to DTOs using the provided mapping context.
   * @template T - The type of the original data objects.
   * @template C - The type of the DTO (Data Transfer Object).
   * @param {T[]} data - The array of data objects to map to DTOs.
   * @param {MappingCtx<C>} mappingCtx - The mapping context containing options and the DTO class.
   * @returns {C[]} The array of mapped DTOs.
   */
  static toDto<T, C>(data: T[], { options, cls }: MappingCtx<C>): C[];
  /**
   * Maps either a single data object or an array of data objects to DTOs using the provided mapping context.
   * @template T - The type of the original data object(s).
   * @template C - The type of the DTO (Data Transfer Object).
   * @param {T | T[]} data - The data object or array of data objects to map to DTO(s).
   * @param {MappingCtx<C>} mappingCtx - The mapping context containing options and the DTO class.
   * @returns {C | C[]} The mapped DTO(s).
   */
  static toDto<T, C>(data: T | T[], { options, cls }: MappingCtx<C>): C | C[] {
    return plainToInstance(cls, data, options);
  }
}
