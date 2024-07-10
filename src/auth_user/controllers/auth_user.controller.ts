import {
  Controller,
  Post,
  Body,
  Headers,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { AuthUserService } from '../services/auth_user.service';
import { AuthPatientRegisterDto } from '../dto/auth-user-register';
import { AuthPatientLoginDto } from '../dto/auth-user-login';
import { AuthForgetPasswordDto } from '../dto/auth-user-forgetPassword.dto';
import { AuthResetPasswordDto } from '../dto/auth-user-resetPassword.dto';
import { Response } from 'express';

@Controller('users')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('/register')
  async register(@Body() createPacienteDto: AuthPatientRegisterDto) {
    return this.authUserService.create(createPacienteDto);
  }

  @Post('/login')
  async login(
    @Body() loginPatientDto: AuthPatientLoginDto,
    @Res() response: Response,
  ) {
    const { access_token } = await this.authUserService.login(loginPatientDto);
    response.cookie('access_cookie', access_token, {
      httpOnly: true,
      secure: true,
    });
    return response.status(HttpStatus.OK).json({ message: 'Bem vindo' });
  }

  @Post('/forget')
  async forgot(@Body() { email }: AuthForgetPasswordDto) {
    return this.authUserService.forget(email);
  }

  @Post('/reset')
  async resetPassword(@Body() { token, password }: AuthResetPasswordDto) {
    return this.authUserService.reset(token, password);
  }

  @Post('/me')
  async me(@Headers() headers) {
    return headers;
  }
}
