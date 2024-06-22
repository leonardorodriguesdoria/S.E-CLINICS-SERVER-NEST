import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 1,
  })
  senha: string;
}
