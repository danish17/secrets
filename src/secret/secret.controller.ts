import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SecretService } from './secret.service';
import { CreateSecretDto } from './dto/secret.dto';
import { SecretEntity } from './entities/secret.entity';

import * as moment from 'moment';

import { Response } from './data/response.data';
import { ICommonResponse } from 'src/interfaces/response.interface';

import {
  decryptMessage,
  encryptMessage,
  generateHash,
  generateSalt,
} from './utils/crypt';
import { DecryptSecretDto } from './dto/passphrase.dto';

@ApiTags('secret')
@Controller('secret')
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @ApiParam({
    name: 'uri',
    type: String,
    description: 'Unique Identifier of the secret.',
  })
  @Get('/:uri')
  async getSecretByUri(
    @Param('uri') uri,
  ): Promise<SecretEntity | ICommonResponse> {
    const secret = await this.secretService.findOneByUri(uri);

    if (!secret) {
      return Response.NOT_FOUND;
    }

    if (secret.viewsLeft <= 0) {
      return Response.EXPIRED;
    }

    await this.secretService.decreaseViews(secret);
    return secret;
  }

  @Post()
  async createSecret(@Body() data: CreateSecretDto) {
    const { validFor, viewsAllowed, passphrase, secret: secretContent } = data;

    const salt = generateSalt();
    const hashedPassphrase = generateHash(passphrase, salt);
    const createdAt = moment();
    const expiresAt = createdAt.add(validFor, 'h');
    const uri = await this.secretService.generateUri();

    // Store secret message as ciphertext.
    const { cipherText, iv } = encryptMessage(
      'aes-192-cbc',
      secretContent,
      passphrase,
    );

    const secret = await this.secretService.createSecret({
      uri,
      views_allowed: viewsAllowed,
      views_left: viewsAllowed,
      created_at: createdAt.toDate(),
      expires_at: expiresAt.toDate(),
      passphrase: hashedPassphrase,
      salt,
      iv,
      secret: cipherText,
    });

    return secret;
  }

  @Post('/decrypt')
  async decryptSecret(@Body() data: DecryptSecretDto) {
    const secret = await this.secretService.findOneById(data.secretId);

    if (!secret) {
      return Response.NOT_FOUND;
    }

    const hashToMatch = generateHash(data.passphrase, secret.salt);
    if (hashToMatch !== secret.passphrase) {
      return Response.UNAUTHORIZED;
    }

    const decryptedMessage = decryptMessage(
      'aes-192-cbc',
      secret.secret,
      data.passphrase,
      secret.iv,
    );

    return decryptedMessage;
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the secret to be shredded',
  })
  @Delete('/shred/:id')
  async deleteSecretById(
    @Param('id')
    id,
  ): Promise<ICommonResponse> {
    const res = await this.secretService.shredSecret(id);

    if (res === -1) {
      return Response.NOT_FOUND;
    }

    return Response.DELETED;
  }
}
