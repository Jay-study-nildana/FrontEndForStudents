import { ApiProperty } from '@nestjs/swagger';

// DTO for returning image details for a post (UUID version)
export class PostImageWithUUIDItemDto {
  @ApiProperty({
    example: 10,
    description: 'Unique ID of the PostImageWithUUID record',
  })
  id!: number;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
    format: 'uuid',
    description: 'UUID of the post',
  })
  postId!: string;

  @ApiProperty({
    example: 'b2c3d4e5-f678-90ab-cdef-234567890abc',
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

export class GetImagesForPostWithUUIDResponseDto {
  @ApiProperty({
    type: [PostImageWithUUIDItemDto],
    description: 'List of images linked to the post (UUID version)',
  })
  images!: PostImageWithUUIDItemDto[];
}
