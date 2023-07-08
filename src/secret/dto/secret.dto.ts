export class CreateSecretDto {
  validFor: number;
  viewsAllowed: number;
  passphrase: string;
  secret: string;
}
