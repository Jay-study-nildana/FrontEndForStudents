import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({ example: "98356d46-600e-40e2-bbcb-e1cab2bda9fc" })
  id: string;

  @ApiProperty({ example: 'A great post' })
  title: string;

  @ApiPropertyOptional({ example: 'Content here' })
  content?: string | null;

  @ApiPropertyOptional({ example: false })
  published?: boolean | null;

  @ApiPropertyOptional({ example: 1 })
  authorId?: number | null;
}
