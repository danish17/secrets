import { DataSource } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: !isProd,
      });

      return dataSource.initialize();
    },
  },
];
