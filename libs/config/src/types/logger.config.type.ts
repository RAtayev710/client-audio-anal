import { LogClient, LogLevel } from '@lib/common/enums';

export type LoggerConfigType = {
  client: LogClient;
  enabled: boolean;
  level: LogLevel;
};
