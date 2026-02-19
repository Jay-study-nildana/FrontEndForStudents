import { ApiProperty } from '@nestjs/swagger';

// DTO for returning image details for a post
export class PostImageItemDto {
  @ApiProperty({
    example: 10,
    description: 'Unique ID of the PostImage record',
  })
  id!: number;

  @ApiProperty({ example: 1, description: 'ID of the post' })
  postId!: number;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
    format: 'uuid',
    description: 'UUID of the file/image',
  })
  fileId!: string;

  @ApiProperty({
    example: '2026-02-18T12:34:56.789Z',
    type: String,
    format: 'date-time',
    description: 'Timestamp when the image was linked to the post',
  })
  createdAt!: Date;
}

export class GetImagesForPostResponseDto {
  @ApiProperty({
    type: [PostImageItemDto],
    description: 'List of images linked to the post',
  })
  images!: PostImageItemDto[];
}
