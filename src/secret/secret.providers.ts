import { DataSource } from 'typeorm';
import { Secret } from './entities/secret.entity';

export const secretProviders = [
  {
    provide: 'SECRET_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Secret),
    inject: ['DATA_SOURCE'],
  },
];
