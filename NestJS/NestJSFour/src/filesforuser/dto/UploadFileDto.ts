import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO used when uploading a file.
 * For now we only support an optional isPublic flag; you can extend later
 * (e.g., tags, description).
 */
export class UploadFileDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    // Accept 'true'/'false' strings (from form-data or query) and booleans
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return !!value;
  })
  @ApiPropertyOptional({
    description: 'Whether the uploaded file should be publicly accessible.',
    example: false,
    type: Boolean,
    default: false,
  })
  // Optional flag indicating public visibility; defaults to false when omitted.
  isPublic?: boolean = false;
}
