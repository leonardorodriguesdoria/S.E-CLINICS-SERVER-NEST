import { Controller, Post, Body } from '@nestjs/common';
import { AuthPatientService } from '../services/auth_patient.service';
import { AuthPatientRegisterDto } from '../dto/auth-patient-register';

@Controller('users')
export class PacienteController {
  constructor(private readonly authPatientService: AuthPatientService) {}

  @Post('/register')
  create(@Body() createPacienteDto: AuthPatientRegisterDto) {
    return this.authPatientService.register(createPacienteDto);
  }
}
