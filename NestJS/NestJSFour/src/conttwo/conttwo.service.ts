import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePostDto';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { GetPostsQueryDto } from './dto/GetPostsQueryDto';
import { PostResponseDto } from './dto/PostResponseDto';
import { PrismaPostRepository } from './conttwo.repository';

/**
 * PostsService - thin application/service layer that depends on the repository
 * abstraction. Keeps controller logic small and translates repository nulls into
 * Nest HTTP exceptions where appropriate.
 */
@Injectable()
export class PostsService {
  constructor(private readonly repo: PrismaPostRepository) {}

  create(input: CreatePostDto): Promise<PostResponseDto> {
    return this.repo.create(input);
  }

  findAll(): Promise<PostResponseDto[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<PostResponseDto> {
    const post = await this.repo.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with id=${id} not found`);
    }
    return post;
  }

  async update(id: number, input: UpdatePostDto): Promise<PostResponseDto> {
    // ensure resource exists so we return 404 instead of Prisma error
    await this.findOne(id);
    return this.repo.update(id, input);
  }

  async remove(id: number): Promise<PostResponseDto> {
    // ensure resource exists so we return 404 instead of Prisma error
    await this.findOne(id);
    return this.repo.delete(id);
  }

  findWithQuery(query: GetPostsQueryDto): Promise<PostResponseDto[]> {
    return this.repo.findWithQuery(query);
  }
}
