import { ApiProperty } from '@nestjs/swagger';

export const ClientJsonField = () =>
  ApiProperty({
    description:
      'Объект типа "ключ: значение", где значение - частота, с которой встречается ключ в звонках.',
    type: 'object',
    additionalProperties: { type: 'number' }, // значение number
    example: { 'Вариант 1': 1, 'не определено': 5 },
  });
