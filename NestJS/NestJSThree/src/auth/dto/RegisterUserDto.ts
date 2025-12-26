import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'P@ssw0rd!', description: 'User password', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'Jane Doe', description: 'Full name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'user', description: "Optional role to assign on registration (defaults to 'user')", required: false })
  @IsOptional()
  @IsString()
  role?: string;
}