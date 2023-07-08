import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSecretDto {
  @IsInt()
  @IsNotEmpty()
  validFor: number;

  @IsInt()
  @IsNotEmpty()
  viewsAllowed: number;

  @IsString()
  @IsNotEmpty()
  passphrase: string;

  @IsString()
  @IsNotEmpty()
  secret: string;
}
