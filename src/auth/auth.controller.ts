import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

interface registerDTO {
  userid: string
  password: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  async register(@Body() body: registerDTO): Promise<object> {
    await this.AuthService.register(body.userid, body.password)
    return Object.assign({
      statusCode: 201,
      message: 'register account.',
    })
  }

  @Post('unregister')
  unregister() {}

  @Post('login')
  login() {}

  @Post('logout')
  logout() {}
}
