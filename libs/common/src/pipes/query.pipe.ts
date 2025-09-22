import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

/**
 * Pipe to transform data objects based on metadata during the pipe execution.
 */
@Injectable()
export class QueryPipe implements PipeTransform {
  /**
   * Transforms the provided data object based on metadata.
   * If metadata metatype is provided, it transforms the DTO using plainToInstance.
   * If metadata metatype is not provided, returns the original DTO.
   * @template F - Type of the filter parameter of the QueryPayload.
   * @template S - Type of the sort parameter of the QueryPayload.
   * @template T - Type of the QueryPayload.
   * @param {T} dto - The data transfer object (DTO) to transform.
   * @param {ArgumentMetadata} metadata - Additional metadata about the argument being processed.
   * @returns {unknown} - Transformed object if metadata metatype is provided, otherwise returns the original DTO.
   */
  transform<F, S, T extends QueryPayload<F, S>>(
    dto: T,
    metadata: ArgumentMetadata,
  ): unknown {
    if (metadata.metatype)
      return plainToInstance(metadata.metatype, dto) as unknown;
    else return dto;
  }
}
