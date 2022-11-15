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
import { Session as ExpressSession } from 'express-session'
import { AuthService } from './auth.service'
import { AuthBody } from './dto/auth.dto.body'
import { JwtAuthGuard } from './jwt/auth.jwt.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  async register(@Body() body: AuthBody): Promise<object> {
    return await this.AuthService.register(body.userid, body.password)
  }

  @Post('unregister')
  async unregister(@Body() body: AuthBody): Promise<object> {
    return await this.AuthService.unregister(body.userid, body.password)
  }

  @Post('login')
  async login(@Body() body: AuthBody, @Session() session: ExpressSession): Promise<object> {
    return await this.AuthService.login(body.userid, body.password, session)
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Session() session: ExpressSession): Promise<object> {
    return await this.AuthService.logout(session)
  }
}
