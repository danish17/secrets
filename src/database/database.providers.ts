import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')) ?? 3306,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: !isProd,
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
