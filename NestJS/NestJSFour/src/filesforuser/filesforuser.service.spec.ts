import { Test, TestingModule } from '@nestjs/testing';
import { FilesforuserService } from './filesforuser.service';

describe('FilesforuserService', () => {
  let service: FilesforuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesforuserService],
    }).compile();

    service = module.get<FilesforuserService>(FilesforuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
