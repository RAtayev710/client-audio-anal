import { Transform } from 'class-transformer';

import { FileUtil } from '@lib/utils';

export function FileUrl(fieldName: string) {
  return Transform(({ obj }: { obj: object }) => {
    const filePath = obj[fieldName] as string;

    return filePath ? FileUtil.getFullFileUrl(filePath) : null;
  });
}
