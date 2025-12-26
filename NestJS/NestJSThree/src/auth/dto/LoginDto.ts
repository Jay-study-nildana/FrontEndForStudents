import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'P@ssw0rd!', description: 'User password', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;
}