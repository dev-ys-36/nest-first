/**
 *
 * The copyright indication and this authorization indication shall be
 * recorded in all copies or in important parts of the Software.
 *
 * @author dev-ys-36
 * @link https://github.com/dev-ys-36
 * @license MIT LICENSE
 *
 */

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as session from 'express-session'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.use(
    session({
      secret: 'nest-first',
      resave: true,
      saveUninitialized: false,
    }),
  )
  await app.listen(3000)
}
bootstrap()
