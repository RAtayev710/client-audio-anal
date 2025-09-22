import { Provider } from '@nestjs/common';

import { ClientInject } from './client.inject';
import { ClientService } from './services';

export const ClientServiceProvider: Provider = {
  provide: ClientInject.SERVICE,
  useClass: ClientService,
};
