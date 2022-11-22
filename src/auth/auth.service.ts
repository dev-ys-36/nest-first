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
import { AxiosError, AxiosResponse } from 'axios'
import { lastValueFrom } from 'rxjs'
import { Repository } from 'typeorm'
import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthUser } from './entity/auth.entity.user'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly userRepository: Repository<AuthUser>,
    private readonly HttpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userid: string, password: string): Promise<object> {
    const registerUser = await this.userRepository.findOne({
      where: { userid },
    })
    if (registerUser) {
      throw new UnauthorizedException('registered.')
    }
    await this.userRepository.save(this.userRepository.create({ userid, password }))
    return {
      statusCode: 201,
      message: 'register account.',
    }
  }

  async unregister(userid: string, password: string): Promise<object> {
    const registerUser = await this.userRepository.findOne({
      where: { userid },
    })
    if (!registerUser) {
      throw new UnauthorizedException('unregistered.')
    }
    await this.userRepository.delete({ userid, password })
    return {
      statusCode: 201,
      message: 'unregister account.',
    }
  }

  async login(userid: string, password: string, session: any): Promise<object> {
    /*if (session.loginStatus) {
      throw new UnauthorizedException('logined.')
    }*/
    const registerUser = await this.userRepository.findOne({
      where: { userid, password },
    })
    if (!registerUser) {
      throw new UnauthorizedException('unregistered.')
    }
    session.loginStatus = true
    session.user = registerUser
    const payload = { id: registerUser.id }
    return {
      statusCode: 201,
      message: 'logined account.',
      access_token: this.jwtService.sign(payload),
    }
  }

  async logout(session: any): Promise<object> {
    if (!session.loginStatus) {
      throw new UnauthorizedException('not logined.')
    }
    session.destroy() // session = null
    return {
      statusCode: 201,
      message: 'logouted account.',
    }
  }

  async kakaoCallback(session: any, kakao: any): Promise<object> {
    session.token = kakao.token
    return {
      statusCode: 201,
      message: 'kakao logined.',
    }
  }

  async kakaoLogout(session: any): Promise<object> {
    const kapi = this.HttpService.post('https://kapi.kakao.com/v1/user/unlink', null, {
      headers: {
        Authorization: 'Bearer ' + session.token,
      },
    })
    await lastValueFrom(kapi)
      .then((response: AxiosResponse) => {
        console.log(response.data)
      })
      .catch((error: AxiosError) => {
        console.log(error.response.data)
      })
    session.destroy()
    return {
      statusCode: 201,
      message: 'kakao logouted.',
    }
  }
}
