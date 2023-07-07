import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('secret')
@Controller('secret')
export class SecretController {
  @Get('/:id')
  getSecretById(@Param('id') id): string {
    return `${id} Hello`;
  }

  @Post()
  createSecret(): string {
    return 'Secret created';
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
