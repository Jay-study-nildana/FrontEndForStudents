// ...existing code...
import { Controller, Get, Post, Body } from '@nestjs/common';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

// Simple DTO
class CreatePostDtoApp {
  @ApiProperty({ description: 'Post title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Post content', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'Published flag', required: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) {}

  // instantiate PrismaService here (singleton per process)
  // private readonly prisma = new PrismaService();

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('posts')
  // @ApiOperation({ summary: 'Create a post' })
  // @ApiBody({ type: CreatePostDtoApp })
  // @ApiCreatedResponse({ description: 'Post created' })
  // async createPost(@Body() dto: CreatePostDtoApp) {
  //   return this.prisma.post.create({
  //     data: {
  //       title: dto.title,
  //       content: dto.content ?? null,
  //       published: dto.published ?? false,
  //     },
  //   });
  // }

  // @Get('posts')
  // @ApiOperation({ summary: 'Get all posts' })
  // @ApiOkResponse({ description: 'List of posts' })
  // async findAllPosts() {
  //   return this.prisma.post.findMany();
  // }
}
