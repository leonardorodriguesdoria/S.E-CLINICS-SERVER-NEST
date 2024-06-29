import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthPatientService } from '../services/auth_patient.service';
import { AuthPatientRegisterDto } from '../dto/auth-patient-register';
import { AuthPatientLoginDto } from '../dto/auth-patient-login';
import { AuthForgetPasswordDto } from '../dto/auth-patient-forgetPassword.dto';
import { AuthResetPasswordDto } from '../dto/auth-patient-resetPassword.dto';

@Controller('users')
export class PacienteController {
  constructor(private readonly authPatientService: AuthPatientService) {}

  @Post('/register')
  async register(@Body() createPacienteDto: AuthPatientRegisterDto) {
    return this.authPatientService.create(createPacienteDto);
  }

  @Post('/login')
  async login(@Body() loginPatientDto: AuthPatientLoginDto) {
    return this.authPatientService.login(loginPatientDto);
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
  async me(@Headers('cookie') access_token) {
    return this.authPatientService.checkToken(access_token.split(' ')[1]);
  }
}
