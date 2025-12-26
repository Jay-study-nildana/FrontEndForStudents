import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class TokensDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT access token' })
  @IsString()
  access_token!: string;

  @ApiProperty({ example: 'f1e2d3c4b5a6...', description: 'Refresh token (present when issuing/rotating)', required: false })
  @IsOptional()
  @IsString()
  refresh_token?: string; // present when issuing/rotating refresh tokens
}