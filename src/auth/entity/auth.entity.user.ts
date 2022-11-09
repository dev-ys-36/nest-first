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

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'auth' })
export class AuthUser {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column('varchar', { name: 'userid', unique: true, length: 15 })
  userid: string

  @Column('varchar', { name: 'password', length: 15 })
  password: string
}
