import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SecretEntity } from './entities/secret.entity';
import { ICreateSecret } from 'src/interfaces/common.interface';
import * as crypto from 'crypto';

@Injectable()
export class SecretService {
  constructor(
    @Inject('SECRET_REPOSITORY')
    private _repository: Repository<SecretEntity>,
  ) {}

  async findOneByUri(uri: string): Promise<SecretEntity> {
    const secret = await this._repository.findOne({ where: { uri: uri } });

    return secret;
  }

  async decreaseViews(secret: SecretEntity): Promise<SecretEntity> {
    secret.viewsLeft -= 1;

    await this._repository.save(secret);

    return secret;
  }

  /**
   * Generates a *unique* URI that can be used to identify the secret.
   * @returns First 7 digits of MD5 String
   */
  async generateUri() {
    const last_record = await this._repository
      .createQueryBuilder('secret')
      .select()
      .orderBy('secret.id', 'DESC')
      .getOne();

    const digest = crypto
      .createHash('md5')
      .update(last_record.id.toString())
      .digest('base64');

    digest.replaceAll(/[^a-zA-Z0-9 -]/g, '');
    return digest.substring(0, 7);
  }

  /**
   * Creates a secret in database.
   * @param data
   * @returns SecretEntity
   */
  async createSecret(data: ICreateSecret): Promise<SecretEntity> {
    const secret = new SecretEntity();
    secret.uri = data.uri;
    secret.createdAt = data.created_at;
    secret.expiresAt = data.expires_at;
    secret.viewsAllowed = data.views_allowed;
    secret.viewsLeft = data.views_left;
    secret.salt = data.salt;
    secret.passphrase = data.passphrase;
    secret.iv = data.iv;
    secret.secret = data.secret;
    await this._repository.save(secret);

    return secret;
  }
}
