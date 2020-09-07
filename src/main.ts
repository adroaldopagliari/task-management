import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as config from 'config';
import AppModule from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const serverOrigin =
    'https://nestjs-task-management-frontend.s3-website-eu-west-1.amazonaws.com';

  const port = process.env.PORT || config.get<number>('server.port');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverOrigin });
    logger.log(`Accepting requests from origin "${serverOrigin}"`);
  }

  await app.listen(port);

  logger.log(`Application started on port ${port}`);
}
bootstrap();
