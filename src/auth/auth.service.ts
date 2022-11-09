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

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthUser } from './entity/auth.entity.user'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly userRepository: Repository<AuthUser>,
  ) {}

  async register(userid: string, password: string): Promise<void> {
    const registerUser = await this.userRepository.findOne({
      where: { userid },
    })
    if (registerUser) {
      throw new UnauthorizedException('registered.')
    }
    await this.userRepository.save(
      this.userRepository.create({ userid, password }),
    )
  }

  async unregister(userid: string, password: string): Promise<void> {
    const registerUser = await this.userRepository.findOne({
      where: { userid },
    })
    if (!registerUser) {
      throw new UnauthorizedException('unregistered.')
    }
    await this.userRepository.delete({ userid, password })
  }

  async login(userid: string, password: string, session: any): Promise<void> {
    if (session.loginStatus) {
      throw new UnauthorizedException('logined.')
    }
    const registerUser = await this.userRepository.findOne({
      where: { userid, password },
    })
    if (!registerUser) {
      throw new UnauthorizedException('unregistered.')
    }
    session.loginStatus = true
    session.user = registerUser
  }

  async logout(userid: string, password: string, session: any): Promise<void> {
    if (!session.loginStatus) {
      throw new UnauthorizedException('not logined.')
    }
    const registerUser = await this.userRepository.findOne({
      where: { userid, password },
    })
    if (!registerUser) {
      throw new UnauthorizedException('unregistered.')
    }
    session.destroy() // session = null
  }
}
