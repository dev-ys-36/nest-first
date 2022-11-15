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
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { HttpModule } from '@nestjs/axios'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthUser } from './entity/auth.entity.user'
import { JwtStrategy } from './jwt/auth.jwt.strategy'
import { KakaoAuthController } from './social/auth.social.kakao.controller'
import { KakaoStrategy } from './social/auth.social.kakao.strategy'

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
    PassportModule.register({
      session: true,
    }),
    JwtModule.register({
      secret: 'dev-ys-36',
      signOptions: { expiresIn: '60s' },
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AuthController, KakaoAuthController],
  providers: [AuthService, JwtStrategy, KakaoStrategy],
})
export class AuthModule {}
