import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID } from 'class-validator';

export class AddImageToPostRequestDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the post to which the image will be linked',
  })
  @IsInt()
  postId!: number;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
    format: 'uuid',
    description: 'UUID of the file/image to link',
  })
  @IsUUID()
  fileId!: string; // UUID
}
