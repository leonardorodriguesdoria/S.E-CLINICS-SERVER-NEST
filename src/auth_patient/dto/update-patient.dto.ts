import { PartialType } from '@nestjs/mapped-types';
import { AuthPatientRegisterDto } from './auth-patient-register';

export class UpdatePatientDto extends PartialType(AuthPatientRegisterDto) {}
