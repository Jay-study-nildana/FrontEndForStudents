import { CreatePostDto } from './dto/CreatePostDto';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { PostResponseDto } from './dto/PostResponseDto';
import { GetPostsQueryDto } from './dto/GetPostsQueryDto';
import { type AddImageToPostRequestDto } from './dto/AddImageToPostRequestDto';
import { type AddImageToPostResponseDto } from './dto/AddImageToPostResponseDto';
import { AddImageToPostWithUUIDRequestDto } from './dto/AddImageToPostWithUUIDRequestDto';
import { AddImageToPostWithUUIDResponseDto } from './dto/AddImageToPostWithUUIDResponseDto';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostRepository } from './post.repository.interface';
import { FilesService } from '../filesforuser/filesforuser.service';
import {
  GetImagesForPostResponseDto,
  PostImageItemDto,
} from './dto/GetImagesForPostResponseDto';
import {
  GetImagesForPostWithUUIDResponseDto,
  PostImageWithUUIDItemDto,
} from './dto/GetImagesForPostWithUUIDResponseDto';

/**
 * PrismaPostRepository is a repository implementation for posts.
 *
 * We inject FilesService here so we can use its file-related methods when needed.
 * Dependency injection allows us to use other services inside this class without manually creating them.
 * This is a best practice in NestJS for modularity, testability, and separation of concerns.
 */
@Injectable()
export class PrismaPostRepository implements PostRepository {
  /**
   * The constructor injects both PrismaService and FilesService.
   *
   * - PrismaService is used for database operations.
   * - FilesService is injected so we can use its methods for file handling.
   *
   * By injecting FilesService, we can call its methods directly in this repository.
   */
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesService: FilesService,
  ) {}

  // async getImagesForPost(postId: number): Promise<GetImagesForPostResponseDto> {
  //   const images = await this.prisma.postImage.findMany({
  //     where: { postId },
  //     orderBy: { id: 'asc' },
  //   });
  //   return {
  //     images: images.map(
  //       (img) =>
  //         ({
  //           id: img.id,
  //           postId: img.postId,
  //           fileId: img.fileId,
  //           createdAt: img.createdAt,
  //         }) as PostImageItemDto,
  //     ),
  //   };
  // }

  // async addImageToPost(
  //   input: AddImageToPostRequestDto,
  // ): Promise<AddImageToPostResponseDto> {
  //   const created = await this.prisma.postImage.create({
  //     data: {
  //       postId: input.postId,
  //       fileId: input.fileId,
  //     },
  //   });
  //   return {
  //     id: created.id,
  //     postId: created.postId,
  //     fileId: created.fileId,
  //     createdAt: created.createdAt,
  //   };
  // }

  async addImageToPostWithUUID(
    input: AddImageToPostWithUUIDRequestDto,
  ): Promise<AddImageToPostWithUUIDResponseDto> {
    const created = await this.prisma.postImageWithUUID.create({
      data: {
        postId: input.postId,
        fileId: input.fileId,
      },
    });
    return {
      id: created.id,
      postId: created.postId,
      fileId: created.fileId,
      createdAt: created.createdAt,
    };
  }

  async getImagesForPostWithUUID(
    postId: string,
  ): Promise<GetImagesForPostWithUUIDResponseDto> {
    const images = await this.prisma.postImageWithUUID.findMany({
      where: { postId },
      orderBy: { id: 'asc' },
    });
    return {
      images: images.map(
        (img) =>
          ({
            id: img.id,
            postId: img.postId,
            fileId: img.fileId,
            createdAt: img.createdAt,
          }) as PostImageWithUUIDItemDto,
      ),
    };
  }

  async create(input: CreatePostDto): Promise<PostResponseDto> {
    const created = await this.prisma.post.create({
      data: {
        title: input.title,
        content: input.content ?? null,
        published: input.published ?? false,
        // connect author if provided
        // ...(input.authorId ? { author: { connect: { id: input.authorId } } } : {}),
      },
    });

    return this.mapPrismaToDto(created);
  }

  /**
   * Generates random posts, stores them in the DB, and links a random image to each post.
   * For each generated post, a random image from the file service is linked using addImageToPostWithUUID.
   */
  async generateRandomPosts(count: number): Promise<PostResponseDto[]> {
    const createdPosts: PostResponseDto[] = [];
    // Get all available images from the file service
    const images = await this.filesService.listAll();
    for (let i = 0; i < count; i++) {
      // Generate random post data using helper functions
      const createDto = {
        title: this.generateRandomTitle(),
        content: this.generateRandomContent(),
        published: Math.random() > 0.5,
      };
      // Store post in DB
      const post = await this.create(createDto);
      createdPosts.push(post);

      // If images are available, randomly link one to the post
      if (images.length > 0) {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await this.addImageToPostWithUUID({
          postId: post.id.toString(),
          fileId: randomImage.id,
        });
      }
    }
    return createdPosts;
  }

  async findAll(): Promise<PostResponseDto[]> {
    const rows = await this.prisma.post.findMany({
      orderBy: { id: 'desc' },
    });
    return rows.map((r) => this.mapPrismaToDto(r));
  }

  async findOne(id: string): Promise<PostResponseDto | null> {
    const row = await this.prisma.post.findUnique({ where: { id } });
    return row ? this.mapPrismaToDto(row) : null;
  }

  async update(id: string, input: UpdatePostDto): Promise<PostResponseDto> {
    // Build data object only with provided properties:
    const data: any = {};
    if (Object.prototype.hasOwnProperty.call(input, 'title'))
      data.title = input.title;
    if (Object.prototype.hasOwnProperty.call(input, 'content'))
      data.content = input.content;
    if (Object.prototype.hasOwnProperty.call(input, 'published'))
      data.published = input.published;

    // Handle authorId changes via relation API:
    if (Object.prototype.hasOwnProperty.call(input, 'authorId')) {
      // if (input.authorId === null) {
      //   data.author = { disconnect: true };
      // } else if (typeof input.authorId === 'number') {
      //   data.author = { connect: { id: input.authorId } };
      // }
    }

    const updated = await this.prisma.post.update({
      where: { id },
      data,
    });

    return this.mapPrismaToDto(updated);
  }

  async delete(id: string): Promise<PostResponseDto> {
    const deleted = await this.prisma.post.delete({ where: { id } });
    return this.mapPrismaToDto(deleted);
  }

  async findWithQuery(query: GetPostsQueryDto): Promise<PostResponseDto[]> {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (typeof query.published !== 'undefined' && query.published !== null) {
      // ensure boolean filtering only when provided
      where.published = query.published;
    }

    const rows = await this.prisma.post.findMany({
      where,
      orderBy: { id: 'desc' },
      skip,
      take: limit,
    });

    return rows.map((r) => this.mapPrismaToDto(r));
  }

  private mapPrismaToDto(row: any): PostResponseDto {
    return {
      id: row.id,
      title: row.title,
      content: row.content ?? null,
      published: row.published ?? null,
      authorId: row.authorId ?? null,
    };
  }

  /**
   * Generates a random title string using an adjective and a noun.
   */
  private generateRandomTitle(): string {
    const adjectives = [
      'Amazing',
      'Brave',
      'Calm',
      'Delightful',
      'Eager',
      'Famous',
      'Graceful',
      'Happy',
      'Jolly',
      'Kind',
      'Lucky',
      'Mighty',
      'Nice',
      'Outstanding',
      'Proud',
      'Quick',
      'Royal',
      'Smart',
      'Sunny',
      'Vivid',
    ];
    const nouns = [
      'Mountain',
      'River',
      'Forest',
      'Ocean',
      'Valley',
      'Garden',
      'Sky',
      'Field',
      'Trail',
      'Desert',
      'Lake',
      'Canyon',
      'Island',
      'Village',
      'Bridge',
      'Tower',
      'Palace',
      'Castle',
      'Harbor',
      'Temple',
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective} ${noun}`;
  }

  /**
   * Generates a random content string using templates, adjectives, nouns, and verbs.
   * The content will be between 500 and 2000 words.
   */
  private generateRandomContent(): string {
    const templates = [
      'The {adjective} {noun} {verb} under the {adjective2} {noun2}.',
      'A {adjective} {noun} decided to {verb} today.',
      'Many {noun}s are {verb}ing in the {noun2}.',
      'Did you see the {adjective} {noun} {verb}?',
      'Everyone loves a {adjective} {noun} that can {verb}.',
    ];
    const adjectives = ['quick', 'bright', 'silent', 'curious', 'ancient'];
    const nouns = ['fox', 'tree', 'river', 'castle', 'cloud'];
    const verbs = ['run', 'shine', 'grow', 'explore', 'rest'];

    // Helper to generate a single sentence
    const makeSentence = () => {
      const template = templates[Math.floor(Math.random() * templates.length)];
      return template
        .replace(
          '{adjective}',
          adjectives[Math.floor(Math.random() * adjectives.length)],
        )
        .replace('{noun}', nouns[Math.floor(Math.random() * nouns.length)])
        .replace('{verb}', verbs[Math.floor(Math.random() * verbs.length)])
        .replace(
          '{adjective2}',
          adjectives[Math.floor(Math.random() * adjectives.length)],
        )
        .replace('{noun2}', nouns[Math.floor(Math.random() * nouns.length)]);
    };

    // Decide on a random word count between 500 and 2000
    const targetWords = 500 + Math.floor(Math.random() * 1501);
    let content = '';
    let wordCount = 0;
    while (wordCount < targetWords) {
      const sentence = makeSentence();
      content += sentence + ' ';
      wordCount += sentence.split(' ').length;
    }
    // Trim to the exact word count
    return content.split(' ').slice(0, targetWords).join(' ').trim();
  }
}
