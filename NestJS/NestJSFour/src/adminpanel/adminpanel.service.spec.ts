import { Test, TestingModule } from '@nestjs/testing';
import { AdminpanelService } from './adminpanel.service';

describe('AdminpanelService', () => {
  let service: AdminpanelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminpanelService],
    }).compile();

    service = module.get<AdminpanelService>(AdminpanelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
