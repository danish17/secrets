export interface ICreateSecret {
  uri: string;
  created_at: Date;
  expires_at: Date;
  views_allowed: number;
  views_left: number;
  passphrase: string;
  salt: string;
  iv: string;
  secret: string;
}
