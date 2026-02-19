import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'f1e2d3c4b5a6...',
    description: 'Refresh token issued during login',
  })
  @IsString()
  refreshToken!: string;
}
