import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "5eb63bbbe01eeed093cb22bb8f5acdc3"', () => {
      expect(appController.getHello()).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
    });
  });
});
