import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Secret } from './entities/secret.entity';

@Injectable()
export class SecretService {
  constructor(
    @Inject('SECRET_REPOSITORY')
    private secretRepository: Repository<Secret>,
  ) {}
}
