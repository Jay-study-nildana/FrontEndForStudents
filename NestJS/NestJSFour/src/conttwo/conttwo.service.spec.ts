import { Test, TestingModule } from '@nestjs/testing';
import { ConttwoService } from './conttwo.service';

describe('ConttwoService', () => {
  let service: ConttwoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConttwoService],
    }).compile();

    service = module.get<ConttwoService>(ConttwoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
