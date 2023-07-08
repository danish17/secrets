import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SecretService } from './secret.service';
import { SecretEntity } from './entities/secret.entity';
import { encryptMessage, generateHash, generateSalt } from './utils/crypt';
import { CreateSecretDto } from './dto/secret.dto';
import * as moment from 'moment';

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
  getSecretByUri(@Param('uri') uri): string {
    return `${uri}`;
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the secret.',
  })
  @Get('/:id')
  async getSecretById(@Param('id') id): Promise<SecretEntity | HttpStatus> {
    const findResult = await this.secretService.findOneById(id);

    if (!findResult) {
      return HttpStatus.NOT_FOUND;
    }

    return findResult;
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

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the secret to be shredded',
  })
  @Delete('/shred/:id')
  deleteSecretById(
    @Param('id')
    id,
  ): HttpStatus {
    return HttpStatus.OK;
  }
}
