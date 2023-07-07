import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretController } from './secret/secret.controller';
import { SecretService } from './secret/secret.service';

@Module({
  imports: [],
  controllers: [AppController, SecretController],
  providers: [AppService, SecretService],
})
export class AppModule {}
