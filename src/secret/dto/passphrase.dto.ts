import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DecryptSecretDto {
  @IsInt()
  @IsNotEmpty()
  secretId: number;

  @IsString()
  @IsNotEmpty()
  passphrase: string;
}
