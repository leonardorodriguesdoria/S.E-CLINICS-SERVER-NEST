import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthPatientRegisterDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Por favor insira um e-mail válido' })
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve ter pelo menos 8 caracteres, contendo números e letras',
    },
  )
  password: string;
}
