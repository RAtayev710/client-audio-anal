import { Provider } from '@nestjs/common';

import { AuthTokenInject } from './auth-token.inject';
import { AuthTokenService } from './services';

export const AuthTokenServiceProvider: Provider = {
  provide: AuthTokenInject.SERVICE,
  useClass: AuthTokenService,
};
