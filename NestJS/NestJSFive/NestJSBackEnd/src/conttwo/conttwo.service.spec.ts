// Prevent loading the real repository (which pulls PrismaService) by mocking it before importing the service.
jest.mock('./conttwo.repository', () => ({
  PrismaPostRepository: class {},
}));

import { NotFoundException } from '@nestjs/common';
import { PostsService } from './conttwo.service';
import { CreatePostDto } from './dto/CreatePostDto';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { GetPostsQueryDto } from './dto/GetPostsQueryDto';

describe('PostsService', () => {
  let service: PostsService;
  let repoMock: any;

  beforeEach(() => {
    repoMock = {
      create: jest
        .fn()
        .mockImplementation(async (dto: CreatePostDto) => ({ id: 1, ...dto })),
      findAll: jest
        .fn()
        .mockResolvedValue([
          { id: 1, title: 't', content: 'c', published: false },
        ]),
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        title: 't',
        content: 'c',
        published: false,
      }),
      update: jest
        .fn()
        .mockImplementation(async (id: number, dto: UpdatePostDto) => ({
          id,
          ...dto,
        })),
      delete: jest
        .fn()
        .mockImplementation(async (id: number) => ({ id, title: 'deleted' })),
      findWithQuery: jest.fn().mockResolvedValue([{ id: 1, title: 't' }]),
    };

    // instantiate service directly with the mock repo (no Nest DI)
    service = new PostsService(repoMock);
  });

  it('create delegates to repository', async () => {
    const dto: CreatePostDto = {
      title: 'hello',
      content: 'world',
      published: true,
    };
    const res = await service.create(dto);
    expect(repoMock.create).toHaveBeenCalledWith(dto);
    expect(res).toHaveProperty('id', 1);
  });

  it('findAll delegates to repository', async () => {
    const res = await service.findAll();
    expect(repoMock.findAll).toHaveBeenCalled();
    expect(Array.isArray(res)).toBe(true);
  });

  it('findOne returns post when found', async () => {
    const res = await service.findOne(1);
    expect(repoMock.findOne).toHaveBeenCalledWith(1);
    expect(res).toHaveProperty('id', 1);
  });

  it('findOne throws NotFoundException when not found', async () => {
    repoMock.findOne.mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('update ensures existence then delegates to repo.update', async () => {
    repoMock.findOne.mockResolvedValueOnce({ id: 1 });
    const dto: UpdatePostDto = { title: 'updated' } as any;
    const res = await service.update(1, dto);
    expect(repoMock.update).toHaveBeenCalledWith(1, dto);
    expect(res).toHaveProperty('id', 1);
  });

  it('update throws NotFoundException when resource missing', async () => {
    repoMock.findOne.mockResolvedValueOnce(null);
    await expect(
      service.update(2, { title: 'x' } as any),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('remove ensures existence then delegates to repo.delete', async () => {
    repoMock.findOne.mockResolvedValueOnce({ id: 1 });
    const res = await service.remove(1);
    expect(repoMock.delete).toHaveBeenCalledWith(1);
    expect(res).toHaveProperty('id', 1);
  });

  it('remove throws NotFoundException when resource missing', async () => {
    repoMock.findOne.mockResolvedValueOnce(null);
    await expect(service.remove(2)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('findWithQuery delegates to repository with provided query', async () => {
    const q: GetPostsQueryDto = { search: 'x' } as any;
    const res = await service.findWithQuery(q);
    expect(repoMock.findWithQuery).toHaveBeenCalledWith(q);
    expect(Array.isArray(res)).toBe(true);
  });
});
