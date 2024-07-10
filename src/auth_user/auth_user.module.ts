import { Module } from '@nestjs/common';
import { AuthUserService } from './services/auth_user.service';
import { AuthUserController } from './controllers/auth_user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/Users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'VGhlIGJvb2sncyBvbiB0aGUgdGFibGU=',
    }),
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService],
  exports: [AuthUserService],
})
export class AuthUserModule {}
