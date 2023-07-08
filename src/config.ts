import { ConfigProps } from './interfaces/config.interface';

export const config = (): ConfigProps => ({
  databaseHost: process.env.DB_HOST,
  databasePort: parseInt(process.env.DB_PORT, 10) || 3306,
  databaseName: process.env.DB_NAME,
  databaseUsername: process.env.DB_USERNAME,
  databasePassword: process.env.DB_PASSWORD,
});
