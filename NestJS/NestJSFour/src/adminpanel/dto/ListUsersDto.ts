import { Type, Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsBoolean, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Query / filter DTO used by the admin list users endpoint and service.
 */
export class ListUsersDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Search term matched against name or email (case-insensitive, contains).',
    example: 'alice@example.com',
    type: String,
  })
  search?: string; // searches name or email (case-insensitive contains)

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter users by role name (exact match).',
    example: 'admin',
    type: String,
  })
  role?: string; // filter by role name

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    // Accept query string values like "true"/"false" as well as boolean types.
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return !!value;
  })
  @ApiPropertyOptional({
    description: 'Filter by active status. Accepts boolean or "true"/"false" string in query.',
    example: true,
    type: Boolean,
  })
  // class-validator doesn't automatically transform 'true'/'false' strings to boolean;
  // Transform above ensures proper boolean conversion from query params.
  isActive?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: 'Page number (1-based).',
    example: 1,
    type: Number,
    default: 1,
  })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  @ApiPropertyOptional({
    description: 'Page size (maximum 200).',
    example: 25,
    type: Number,
    default: 25,
  })
  pageSize?: number = 25;
}