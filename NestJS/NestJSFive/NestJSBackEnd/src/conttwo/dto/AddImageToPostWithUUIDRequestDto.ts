import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AddImageToPostWithUUIDRequestDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
    format: 'uuid',
    description: 'UUID of the post to which the image will be linked',
  })
  @IsUUID()
  postId!: string;

  @ApiProperty({
    example: 'b2c3d4e5-f678-90ab-cdef-234567890abc',
    format: 'uuid',
    description: 'UUID of the file/image to link',
  })
  @IsUUID()
  fileId!: string;
}
