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
import {
  GetImagesForPostResponseDto,
  PostImageItemDto,
} from './dto/GetImagesForPostResponseDto';
import { GetImagesForPostWithUUIDResponseDto, PostImageWithUUIDItemDto } from './dto/GetImagesForPostWithUUIDResponseDto';

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private readonly prisma: PrismaService) {}

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
}
