/**
 * UpdateUserDto - DTO for updating user (partial allowed)
 *
 * - All fields are optional but at least one should be provided by route logic.
 * - Use @IsOptional to allow missing fields during validation.
 */

import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  @IsString()
  @Length(1, 200)
  name?: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}