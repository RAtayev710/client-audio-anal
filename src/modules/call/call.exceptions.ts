import { HttpStatus } from '@nestjs/common';

import { HttpException } from '@lib/common/types';

import { CallExceptionName } from './call.enums';

export const callExceptions: Record<CallExceptionName, HttpException> = {
  [CallExceptionName.TRANSCRIBATION_UPLOAD_ERROR]: {
    code: CallExceptionName.TRANSCRIBATION_UPLOAD_ERROR,
    message: 'Ошибка при загрузке файла с транскрибацией в хранилище.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
};
