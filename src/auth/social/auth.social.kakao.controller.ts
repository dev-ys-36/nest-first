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
import { Request, Response } from 'express'
import { Session as ExpressSession } from 'express-session'

import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from '@nestjs/common'

import { AuthService } from '../auth.service'
import { KakaoAuthGuard } from './auth.social.kakao.guard'

@Controller('auth/kakao')
export class KakaoAuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Get('login')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(): Promise<void> {}

  @Get('callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(@Session() session: ExpressSession, @Req() req: Request): Promise<object> {
    return await this.AuthService.kakaoCallback(session, req.user)
  }

  @Get('logout')
  async kakaoLogout(@Session() session: ExpressSession): Promise<object> {
    return await this.AuthService.kakaoLogout(session)
  }
}
