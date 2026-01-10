/**
 * CreateUserDto - class-validator DTO for creating a user
 *
 * Notes:
 * - Uses class-transformer @Transform to trim input and normalize email
 * - Decorators enforce type/format constraints
 */

import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(1, 200)
  name!: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail()
  email!: string;

  // Optional active flag
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}