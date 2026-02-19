import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post as HttpPost,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { PostsService } from './conttwo.service';
import { CreatePostDto } from './dto/CreatePostDto';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { GetPostsQueryDto } from './dto/GetPostsQueryDto';
import { PostResponseDto } from './dto/PostResponseDto';
import { AddImageToPostRequestDto } from './dto/AddImageToPostRequestDto';
import { AddImageToPostResponseDto } from './dto/AddImageToPostResponseDto';
import { GetImagesForPostResponseDto } from './dto/GetImagesForPostResponseDto';
import { AddImageToPostWithUUIDRequestDto } from './dto/AddImageToPostWithUUIDRequestDto';
import { AddImageToPostWithUUIDResponseDto } from './dto/AddImageToPostWithUUIDResponseDto';
import { GetImagesForPostWithUUIDResponseDto } from './dto/GetImagesForPostWithUUIDResponseDto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @HttpPost()
  @ApiOperation({ summary: 'Create a post' })
  @ApiCreatedResponse({
    description: 'The created post',
    type: PostResponseDto,
  })
  create(@Body() dto: CreatePostDto): Promise<PostResponseDto> {
    return this.service.create(dto);
  }

  /**
   * GET /posts
   * - If query params (page/limit/published) are provided, we delegate to findWithQuery.
   * - Otherwise we return all posts.
   */
  @Get()
  @ApiOperation({ summary: 'List posts' })
  @ApiOkResponse({ description: 'List of posts', type: [PostResponseDto] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'published', required: false, type: Boolean })
  async findAll(@Query() query: GetPostsQueryDto): Promise<PostResponseDto[]> {
    // If any meaningful query is set, use findWithQuery for pagination/filtering
    const hasQuery =
      (query.page && query.page > 1) ||
      (query.limit && query.limit > 0) ||
      typeof query.published !== 'undefined';

    if (hasQuery) {
      return this.service.findWithQuery(query);
    }
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'The post', type: PostResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PostResponseDto> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Updated post', type: PostResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Deleted post', type: PostResponseDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<PostResponseDto> {
    return this.service.remove(id);
  }

  @HttpPost('add-image')
  @ApiOperation({ summary: 'Add an image to a post' })
  @ApiBody({
    description: 'Post ID and File ID to link as image',
    type: AddImageToPostRequestDto,
    examples: {
      example1: {
        summary: 'Basic example',
        value: {
          postId: 1,
          fileId: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Image added to post',
    type: AddImageToPostResponseDto,
  })
  async addImageToPost(
    @Body() dto: AddImageToPostRequestDto,
  ): Promise<AddImageToPostResponseDto> {
    return this.service.addImageToPost(dto);
  }

  @HttpPost('add-image-uuid')
  @ApiOperation({ summary: 'Add an image to a post (UUID)' })
  @ApiBody({
    description: 'Post UUID and File UUID to link as image',
    type: AddImageToPostWithUUIDRequestDto,
    examples: {
      example1: {
        summary: 'UUID example',
        value: {
          postId: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
          fileId: 'b2c3d4e5-f678-90ab-cdef-234567890abc',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Image added to post (UUID)',
    type: AddImageToPostWithUUIDResponseDto,
  })
  async addImageToPostWithUUID(
    @Body() dto: AddImageToPostWithUUIDRequestDto,
  ): Promise<AddImageToPostWithUUIDResponseDto> {
    return this.service.addImageToPostWithUUID(dto);
  }

  @Get(':id/images')
  @ApiOperation({ summary: 'Get all images for a post' })
  @ApiOkResponse({
    description: 'List of images for the post',
    type: GetImagesForPostResponseDto,
  })
  async getImagesForPost(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetImagesForPostResponseDto> {
    return this.service.getImagesForPost(id);
  }

  @Get(':uuid/images-uuid')
  @ApiOperation({ summary: 'Get all images for a post (UUID)' })
  @ApiParam({ name: 'uuid', type: String, description: 'UUID of the post' })
  @ApiOkResponse({
    description: 'List of images for the post (UUID)',
    type: GetImagesForPostWithUUIDResponseDto,
  })
  async getImagesForPostWithUUID(
    @Param('uuid') uuid: string,
  ): Promise<GetImagesForPostWithUUIDResponseDto> {
    return this.service.getImagesForPostWithUUID(uuid);
  }
}
