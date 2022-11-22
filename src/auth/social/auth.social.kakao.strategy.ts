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
import { Strategy } from 'passport-kakao'

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

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
