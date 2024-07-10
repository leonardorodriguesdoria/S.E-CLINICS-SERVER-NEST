import { PartialType } from '@nestjs/mapped-types';
import { AuthPatientRegisterDto } from './auth-user-register';

export class UpdatePatientDto extends PartialType(AuthPatientRegisterDto) {}
