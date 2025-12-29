import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'A great post' })
  title: string;

  @ApiPropertyOptional({ example: 'Content here' })
  content?: string | null;

  @ApiPropertyOptional({ example: false })
  published?: boolean | null;

  @ApiPropertyOptional({ example: 1 })
  authorId?: number | null;
}