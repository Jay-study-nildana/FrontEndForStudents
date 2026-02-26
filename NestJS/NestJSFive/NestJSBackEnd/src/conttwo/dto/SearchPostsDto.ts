import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchPostsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    pageSize?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Field to sort by (e.g. id, title, content, published, authorId)',
    enum: ['id', 'title', 'content', 'published', 'authorId'],
    required: false,
  })
  sortBy?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Sort order: asc (ascending) or desc (descending)',
    enum: ['asc', 'desc'],
    required: false,
  })
  sortOrder?: string;
}