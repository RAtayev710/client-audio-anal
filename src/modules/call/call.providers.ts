import { Provider } from '@nestjs/common';

import { CallInject } from './call.inject';
import { CallService } from './services';

export const CallServiceProvider: Provider = {
  provide: CallInject.SERVICE,
  useClass: CallService,
};
