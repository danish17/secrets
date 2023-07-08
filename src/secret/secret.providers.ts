import { DataSource } from 'typeorm';
import { SecretEntity } from './entities/secret.entity';

export const secretProviders = [
  {
    provide: 'SECRET_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SecretEntity),
    inject: ['DATA_SOURCE'],
  },
];
