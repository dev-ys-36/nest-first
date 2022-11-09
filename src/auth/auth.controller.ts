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

import { Body, Controller, Post, Session } from '@nestjs/common'
import { AuthService } from './auth.service'

interface authDTO {
  userid: string
  password: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  async register(@Body() body: authDTO): Promise<object> {
    await this.AuthService.register(body.userid, body.password)
    return Object.assign({
      statusCode: 201,
      message: 'register account.',
    })
  }

  @Post('unregister')
  async unregister(@Body() body: authDTO): Promise<object> {
    await this.AuthService.unregister(body.userid, body.password)
    return Object.assign({
      statusCode: 201,
      message: 'unregister account.',
    })
  }

  @Post('login')
  async login(@Body() body: authDTO, @Session() session: any): Promise<object> {
    await this.AuthService.login(body.userid, body.password, session)
    return Object.assign({
      statusCode: 201,
      message: 'logined account.',
    })
  }

  @Post('logout')
  async logout(
    @Body() body: authDTO,
    @Session() session: any,
  ): Promise<object> {
    await this.AuthService.logout(body.userid, body.password, session)
    return Object.assign({
      statusCode: 201,
      message: 'logouted account.',
    })
  }
}
