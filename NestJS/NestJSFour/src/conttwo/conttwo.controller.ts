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
} from '@nestjs/swagger';
import { PostsService } from './conttwo.service';
import { CreatePostDto } from './dto/CreatePostDto';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { GetPostsQueryDto } from './dto/GetPostsQueryDto';
import { PostResponseDto } from './dto/PostResponseDto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @HttpPost()
  @ApiOperation({ summary: 'Create a post' })
  @ApiCreatedResponse({ description: 'The created post', type: PostResponseDto })
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
}