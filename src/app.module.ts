import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretController } from './secret/secret.controller';
import { SecretService } from './secret/secret.service';
import { DatabaseModule } from './database/database.module';
import { secretProviders } from './secret/secret.providers';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
  ],
  controllers: [AppController, SecretController],
  providers: [...secretProviders, AppService, SecretService],
})
export class AppModule {}
