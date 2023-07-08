export class CreateSecretDto {
  uri: string;
  created_at: Date;
  expires_at: Date;
  views_allowed: number;
  views_left: number;
  passphrase: string;
  secret: string;
}
