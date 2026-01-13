import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class UserResponseDto {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'UUID',
  })
  @IsString()
  id!: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsString()
  email!: string;

  @ApiProperty({
    example: 'Jane Doe',
    description: 'Full name',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  name?: string | null;

  @ApiProperty({ example: true, description: 'Whether the user is active' })
  @IsBoolean()
  isActive!: boolean;

  @ApiProperty({
    example: '2025-12-26T12:34:56.000Z',
    description: 'When email was verified',
    required: false,
    nullable: true,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  emailVerifiedAt?: Date | null;

  @ApiProperty({
    example: '2025-12-26T12:34:56.000Z',
    description: 'Last login timestamp',
    required: false,
    nullable: true,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  lastLoginAt?: Date | null;

  @ApiProperty({
    example: ['user', 'admin'],
    description: 'Role names assigned to the user',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  roles!: string[]; // role names

  @ApiProperty({
    example: '2025-12-26T12:34:56.000Z',
    description: 'Creation timestamp',
    type: String,
    format: 'date-time',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2025-12-26T12:34:56.000Z',
    description: 'Last update timestamp',
    required: false,
    nullable: true,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  updatedAt?: Date | null;
}
