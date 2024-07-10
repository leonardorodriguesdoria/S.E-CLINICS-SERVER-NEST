import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetPasswordDto {
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve ter pelo menos 8 caracteres, contendo números e letras(1 minúscula, 1 maiúscula e 1 símbolo)',
    },
  )
  password: string;

  @IsJWT({})
  token: string;
}
