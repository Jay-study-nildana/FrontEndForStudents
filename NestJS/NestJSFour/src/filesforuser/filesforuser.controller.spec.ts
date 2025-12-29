import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './filesforuser.controller';
import { FilesService } from './filesforuser.service';

describe('FilesforuserController', () => {
  let controller: FilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
