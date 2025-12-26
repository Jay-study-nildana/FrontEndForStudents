import { Test, TestingModule } from '@nestjs/testing';
import { ConttwoController } from './conttwo.controller';
import { ConttwoService } from './conttwo.service';

describe('ConttwoController', () => {
  let controller: ConttwoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConttwoController],
      providers: [ConttwoService],
    }).compile();

    controller = module.get<ConttwoController>(ConttwoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
