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
