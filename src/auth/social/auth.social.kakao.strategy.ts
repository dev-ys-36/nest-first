import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-kakao'

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: '220de28dc17371d455e627e1f440924c',
      clientSecret: '',
      callbackURL: '/auth/kakao/callback',
      passReqToCallback: true,
    })
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: any) {
    done(null, { token: accessToken })
  }
}
