import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Independent UpdatePostDto (does not extend CreatePostDto).
 * All fields are optional so partial updates are possible.
 * This explicit class works well with Swagger (class-based).
 */
export class UpdatePostDto {
  @ApiPropertyOptional({
    example: 'Updated title',
    minLength: 1,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  title?: string;

  @ApiPropertyOptional({ example: 'Updated content', nullable: true })
  @IsOptional()
  @IsString()
  content?: string | null;

  @ApiPropertyOptional({ example: true, nullable: true })
  @IsOptional()
  @IsBoolean()
  published?: boolean | null;

  // @ApiPropertyOptional({ example: 1, description: 'Author id (optional), use integer or null' })
  // @IsOptional()
  // @Type(() => Number)
  // @IsInt()
  // authorId?: number | null;
}
