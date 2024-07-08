import {
  Controller,
  Post,
  Body,
  Headers,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { AuthPatientService } from '../services/auth_patient.service';
import { AuthPatientRegisterDto } from '../dto/auth-patient-register';
import { AuthPatientLoginDto } from '../dto/auth-patient-login';
import { AuthForgetPasswordDto } from '../dto/auth-patient-forgetPassword.dto';
import { AuthResetPasswordDto } from '../dto/auth-patient-resetPassword.dto';
import { Response } from 'express';

@Controller('users')
export class PacienteController {
  constructor(private readonly authPatientService: AuthPatientService) {}

  @Post('/register')
  async register(@Body() createPacienteDto: AuthPatientRegisterDto) {
    return this.authPatientService.create(createPacienteDto);
  }

  @Post('/login')
  async login(
    @Body() loginPatientDto: AuthPatientLoginDto,
    @Res() response: Response,
  ) {
    const { access_token } =
      await this.authPatientService.login(loginPatientDto);
    response.cookie('access_cookie', access_token, {
      httpOnly: true,
      secure: true,
    });
    return response.status(HttpStatus.OK).json({ message: 'Bem vindo' });
  }

  @Post('/forget')
  async forgot(@Body() { email }: AuthForgetPasswordDto) {
    return this.authPatientService.forget(email);
  }

  @Post('/reset')
  async resetPassword(@Body() { token, password }: AuthResetPasswordDto) {
    return this.authPatientService.reset(token, password);
  }

  @Post('/me')
  async me(@Headers() headers) {
    return headers;
  }
}
