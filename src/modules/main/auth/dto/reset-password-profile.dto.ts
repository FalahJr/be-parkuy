import { IsString, MinLength } from "class-validator";

export class ResetPasswordProfileDto {
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  password_confirmation: string;
}