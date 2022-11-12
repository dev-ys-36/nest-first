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

import { Body, Controller, Post, Get, Session, UseGuards, Res, Req } from '@nestjs/common'
import { Response, Request } from 'express'
import { IsNotEmpty } from 'class-validator'
import { AuthService } from './auth.service'
import { KakaoAuthGuard } from './social/auth.social.kakao.guard'

export class authDTO {
  @IsNotEmpty()
  userid: string

  @IsNotEmpty()
  password: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  async register(@Body() body: authDTO): Promise<object> {
    return await this.AuthService.register(body.userid, body.password)
  }

  @Post('unregister')
  async unregister(@Body() body: authDTO): Promise<object> {
    return await this.AuthService.unregister(body.userid, body.password)
  }

  @Post('login')
  async login(@Body() body: authDTO, @Session() session: any): Promise<object> {
    return await this.AuthService.login(body.userid, body.password, session)
  }

  @Get('logout')
  async logout(@Session() session: any): Promise<object> {
    return await this.AuthService.logout(session)
  }

  @Get('kakao/login')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(@Req() req: Request): Promise<any> {}

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(@Session() session: any, @Req() req: Request): Promise<object> {
    return await this.AuthService.kakaoCallback(session, req.user)
  }

  @Get('kakao/logout')
  async kakaoLogout(@Session() session: any): Promise<object> {
    return await this.AuthService.kakaoLogout(session)
  }
}
