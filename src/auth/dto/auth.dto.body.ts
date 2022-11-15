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

import { IsNotEmpty } from 'class-validator'

export class AuthBody {
  @IsNotEmpty()
  userid: string

  @IsNotEmpty()
  password: string
}
