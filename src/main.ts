import { Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AjvValidationPipe } from '@lib/ajv/ajv-validation.pipe';
import { JsonSchema } from '@lib/ajv/types';
import { LoggerCtx } from '@lib/common/enums';
import {
  HttpExceptionFilter,
  PrismaClientExceptionFilter,
} from '@lib/common/filters';
import { ResponseToDtoInterceptor } from '@lib/common/interceptors';
import { AppConfig } from '@lib/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const appConfig: ConfigType<typeof AppConfig> = app.get(AppConfig.KEY);

  const logger: Logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  app.setGlobalPrefix(appConfig.globalPrefix);
  app.useGlobalInterceptors(new ResponseToDtoInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    new HttpExceptionFilter(httpAdapter),
  );

  app.enableCors({ origin: '*', credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Client Audio Anal')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // writeFileSync('swagger.json', JSON.stringify(document));

  SwaggerModule.setup(`${appConfig.globalPrefix}/docs`, app, document);

  app.useGlobalPipes(
    new AjvValidationPipe<JsonSchema>({ context: LoggerCtx.AJV }),
  );

  await app.listen(appConfig.port, appConfig.host);
}
bootstrap();
