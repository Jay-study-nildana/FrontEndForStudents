// prevent ESM uuid import from breaking Jest by mocking before any imports
jest.mock('uuid', () => ({ v4: () => 'mock-uuid' }));

import { Test, TestingModule } from '@nestjs/testing';
import { ContoneService } from './contone.service';
import { InMemoryContoneRepository } from './contone.repository';
import { CreateContoneDto } from './dto/create-contone.dto';
import { UpdateContoneDto } from './dto/update-contone.dto';
import { Contone } from './entities/contone.entity';

describe('ContoneService', () => {
  let service: ContoneService;
  let repoMock: any;

  beforeEach(async () => {
    repoMock = {
      create: jest.fn().mockImplementation(
        (dto: CreateContoneDto) =>
          ({
            id: '1',
            ...dto,
            createdAt: new Date(),
            title: (dto as any).title ?? 'a',
          }) as Contone,
      ),
      findAll: jest
        .fn()
        .mockResolvedValue([
          { id: '1', name: 'a', title: 'a', createdAt: new Date() } as Contone,
        ]),
      findOne: jest.fn().mockImplementation((id: string) =>
        id === '1'
          ? ({
              id: '1',
              name: 'a',
              title: 'a',
              createdAt: new Date(),
            } as Contone)
          : null,
      ),
      update: jest.fn().mockImplementation(
        (id: string, dto: UpdateContoneDto) =>
          ({
            id,
            ...dto,
            createdAt: new Date(),
            title: (dto as any).title ?? 'a',
          }) as Contone,
      ),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContoneService,
        { provide: InMemoryContoneRepository, useValue: repoMock },
      ],
    }).compile();

    service = module.get<ContoneService>(ContoneService);
  });

  it('create delegates to repository and returns created item', () => {
    const dto: CreateContoneDto = { name: 'new' } as any;
    const res = service.create(dto);
    expect(repoMock.create).toHaveBeenCalledWith(dto);
    expect(res).toHaveProperty('id', '1');
  });

  it('findAll delegates to repository', async () => {
    const res = await service.findAll();
    expect(repoMock.findAll).toHaveBeenCalled();
    expect(Array.isArray(res)).toBe(true);
  });

  it('findOne returns item when found', async () => {
    const res = await service.findOne('1');
    expect(repoMock.findOne).toHaveBeenCalledWith('1');
    expect(res).toHaveProperty('id', '1');
  });

  it('findOne throws when not found', async () => {
    await expect(() => service.findOne('999')).toThrow();
  });

  it('update delegates to repo.update after existence check', async () => {
    // service.update calls repo.findOne internally via findOne -> will return for id '1'
    const dto: UpdateContoneDto = { name: 'updated' } as any;
    const res = await service.update('1', dto);
    expect(repoMock.update).toHaveBeenCalledWith('1', dto);
    expect(res).toHaveProperty('id', '1');
  });

  it('remove delegates to repo.remove', () => {
    service.remove('1');
    expect(repoMock.remove).toHaveBeenCalledWith('1');
  });
});
