import { Test, TestingModule } from '@nestjs/testing';
import { ContoneService } from './contone.service';

describe('ContoneService', () => {
  let service: ContoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContoneService],
    }).compile();

    service = module.get<ContoneService>(ContoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
