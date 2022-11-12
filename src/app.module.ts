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

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { AuthUser } from './auth/entity/auth.entity.user'
import { KakaoStrategy } from './auth/social/auth.social.kakao.strategy'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dev-ys-36',
      database: 'auth',
      entities: [AuthUser],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([AuthUser]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy],
})
export class AppModule {}
