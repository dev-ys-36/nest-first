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

  async register(
    userid: string,
    password: string,
  ): Promise<UnauthorizedException | void> {
    const registerUser = await this.userRepository.findOne({
      where: { userid },
    })
    if (registerUser) {
      throw new UnauthorizedException('already exist.')
    }
    await this.userRepository.save({
      userid,
      password,
    })
  }

  async login(
    userid: string,
    password: string,
  ): Promise<UnauthorizedException | void> {
    const registerUser = await this.userRepository.findOne({
      where: { userid },
    })
    if (registerUser) {
      throw new UnauthorizedException('already exist.')
    }
    await this.userRepository.save({
      userid,
      password,
    })
  }
}
