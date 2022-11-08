import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { AuthUser } from './auth/entity/auth.entity.user'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dev-ys-36',
      database: 'auth',
      entities: [AuthUser],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([AuthUser]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
