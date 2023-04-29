import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
