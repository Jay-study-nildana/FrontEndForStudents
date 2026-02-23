import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePostDto';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { GetPostsQueryDto } from './dto/GetPostsQueryDto';
import { PostResponseDto } from './dto/PostResponseDto';
import { PrismaPostRepository } from './conttwo.repository';
import { GetImagesForPostResponseDto } from './dto/GetImagesForPostResponseDto';
import { AddImageToPostRequestDto } from './dto/AddImageToPostRequestDto';
import { AddImageToPostResponseDto } from './dto/AddImageToPostResponseDto';
import { AddImageToPostWithUUIDRequestDto } from './dto/AddImageToPostWithUUIDRequestDto';
import { AddImageToPostWithUUIDResponseDto } from './dto/AddImageToPostWithUUIDResponseDto';
import { GetImagesForPostWithUUIDResponseDto } from './dto/GetImagesForPostWithUUIDResponseDto';

/**
 * PostsService - thin application/service layer that depends on the repository
 * abstraction. Keeps controller logic small and translates repository nulls into
 * Nest HTTP exceptions where appropriate.
 */
@Injectable()
export class PostsService {
  /**
   * Generates random posts and links random images to them using the repository method.
   * @param count Number of posts to generate
   */
  generateRandomPosts(count: number): Promise<PostResponseDto[]> {
    return this.repo.generateRandomPosts(count);
  }
  constructor(private readonly repo: PrismaPostRepository) {}

  create(input: CreatePostDto): Promise<PostResponseDto> {
    return this.repo.create(input);
  }

  findAll(): Promise<PostResponseDto[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<PostResponseDto> {
    const post = await this.repo.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with id=${id} not found`);
    }
    return post;
  }

  async update(id: string, input: UpdatePostDto): Promise<PostResponseDto> {
    // ensure resource exists so we return 404 instead of Prisma error
    await this.findOne(id);
    return this.repo.update(id, input);
  }

  async remove(id: string): Promise<PostResponseDto> {
    // ensure resource exists so we return 404 instead of Prisma error
    await this.findOne(id);
    return this.repo.delete(id);
  }

  findWithQuery(query: GetPostsQueryDto): Promise<PostResponseDto[]> {
    return this.repo.findWithQuery(query);
  }

  // async addImageToPost(
  //   input: AddImageToPostRequestDto,
  // ): Promise<AddImageToPostResponseDto> {
  //   // Optionally, check if post exists before adding image
  //   await this.findOne(input.postId);
  //   return this.repo.addImageToPost(input);
  // }

  async addImageToPostWithUUID(
    input: AddImageToPostWithUUIDRequestDto,
  ): Promise<AddImageToPostWithUUIDResponseDto> {
    // Optionally, check if post exists before adding image
    // If you have a UUID-based post lookup, implement it here
    // Example: await this.repo.findOneByUUID(input.postId);
    return this.repo.addImageToPostWithUUID(input);
  }

  // async getImagesForPost(postId: number): Promise<GetImagesForPostResponseDto> {
  //   // Optionally, check if post exists before fetching images
  //   await this.findOne(postId);
  //   return this.repo.getImagesForPost(postId);
  // }

  async getImagesForPostWithUUID(
    postId: string,
  ): Promise<GetImagesForPostWithUUIDResponseDto> {
    // Optionally, check if post exists before fetching images
    // Example: await this.repo.findOneByUUID(postId);
    return this.repo.getImagesForPostWithUUID(postId);
  }
}
