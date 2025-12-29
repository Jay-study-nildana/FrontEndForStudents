// ...existing code...
/**
 * Minimal DTO returned for each user in the admin list.
 *
 * Purpose:
 * - Provide a safe, minimal shape for listing users in the admin UI / API responses.
 * - Exclude sensitive fields (passwords, refresh tokens, secrets).
 * - Annotated for Swagger/OpenAPI so generated docs show exact field types, examples and nullable behavior.
 *
 * Documentation notes:
 * - Dates are represented as ISO 8601 strings in the API surface (type: String, format: 'date-time').
 * - Optional fields are documented with ApiPropertyOptional to make their nullability explicit in Swagger UI.
 * - Roles are exposed as an array of role names (string[]) to avoid leaking role entity shapes.
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserListItemDto {
  @ApiProperty({
    description: 'Unique identifier for the user.',
    example: 'user_123',
    type: String,
  })
  id!: string;

  @ApiProperty({
    description: 'Primary email for the user (used for login and notifications).',
    example: 'alice@example.com',
    type: String,
  })
  email!: string;

  @ApiPropertyOptional({
    description: 'Display name for the user, if available.',
    example: 'Alice',
    type: String,
    nullable: true,
  })
  name?: string | null;

  @ApiProperty({
    description: 'Whether the user account is active and allowed to authenticate.',
    example: true,
    type: Boolean,
  })
  isActive!: boolean;

  @ApiPropertyOptional({
    description: 'ISO 8601 timestamp when the user verified their email, or null if not verified.',
    example: '2025-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
    nullable: true,
  })
  emailVerifiedAt?: Date | null;

  @ApiPropertyOptional({
    description: 'ISO 8601 timestamp of the user\'s last successful login, or null if never logged in.',
    example: '2025-02-01T12:34:56.000Z',
    type: String,
    format: 'date-time',
    nullable: true,
  })
  lastLoginAt?: Date | null;

  @ApiProperty({
    description: 'List of role names assigned to the user. Strings only to keep response compact and stable.',
    example: ['admin', 'moderator'],
    isArray: true,
    type: String,
  })
  roles!: string[]; // list of role names

  @ApiProperty({
    description: 'ISO 8601 timestamp when the user record was created.',
    example: '2025-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  createdAt!: Date;

  @ApiPropertyOptional({
    description: 'ISO 8601 timestamp when the user record was last updated, or null.',
    example: '2025-03-01T08:00:00.000Z',
    type: String,
    format: 'date-time',
    nullable: true,
  })
  updatedAt?: Date | null;
}
// ...existing code...