import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretController } from './secret/secret.controller';
import { SecretService } from './secret/secret.service';
import { DatabaseModule } from './database/database.module';
import { secretProviders } from './secret/secret.providers';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    DatabaseModule,
  ],
  controllers: [AppController, SecretController],
  providers: [
    ...secretProviders,
    AppService,
    SecretService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
