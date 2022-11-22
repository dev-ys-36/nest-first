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
import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
