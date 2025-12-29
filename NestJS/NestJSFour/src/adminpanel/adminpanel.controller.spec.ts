import { Test, TestingModule } from '@nestjs/testing';
import { AdminpanelController } from './adminpanel.controller';
import { AdminpanelService } from './adminpanel.service';

describe('AdminpanelController', () => {
  let controller: AdminpanelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminpanelController],
      providers: [AdminpanelService],
    }).compile();

    controller = module.get<AdminpanelController>(AdminpanelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
