import { Test, TestingModule } from '@nestjs/testing';
import { ContoneController } from './contone.controller';
import { ContoneService } from './contone.service';

describe('ContoneController', () => {
  let controller: ContoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContoneController],
      providers: [ContoneService],
    }).compile();

    controller = module.get<ContoneController>(ContoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
