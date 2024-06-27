import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class AuthPatientRegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo de nome é obrigatório' })
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
        'A senha deve ter pelo menos 8 caracteres, contendo números e letras(1 minúscula, 1 maiúscula e 1 símbolo)',
    },
  )
  @IsNotEmpty({ message: 'O campo de senha é obrigatório' })
  password: string;
}
