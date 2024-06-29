import { Module } from '@nestjs/common';
import { AuthPatientService } from './services/auth_patient.service';
import { PacienteController } from './controllers/auth_patient.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPatient } from './entity/auth_patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthPatient]),
    JwtModule.register({
      secret: 'VGhlIGJvb2sncyBvbiB0aGUgdGFibGU=',
    }),
  ],
  controllers: [PacienteController],
  providers: [AuthPatientService],
  exports: [AuthPatientService],
})
export class AuthPatientModule {}
