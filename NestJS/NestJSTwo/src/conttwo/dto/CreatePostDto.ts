import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, Length } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'A great post', minLength: 1, maxLength: 255 })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiPropertyOptional({ example: 'This is the content of the post.' })
  @IsOptional()
  @IsString()
  content?: string | null;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean | null;

  // @ApiPropertyOptional({ example: 1, description: 'Author id (optional)' })
  // @IsOptional()
  // // keep it simple here — controller param/pipe can ensure numeric authorId if needed
  // authorId?: number | null;
}