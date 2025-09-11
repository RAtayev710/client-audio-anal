import { Injectable, PipeTransform } from '@nestjs/common';

import { B64UUtil, CryptoUtil } from '@lib/utils';

@Injectable()
export class EncrytedIdPipe implements PipeTransform {
  transform<T extends IdObject>({ id }: T): unknown {
    return CryptoUtil.decryptId(B64UUtil.fromBase64Url(id));
  }
}
