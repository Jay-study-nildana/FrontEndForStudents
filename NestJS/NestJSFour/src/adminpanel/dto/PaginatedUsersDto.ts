// ...existing code...
import { ApiProperty } from '@nestjs/swagger';
// ApiProperty is used to annotate response shapes so Swagger (OpenAPI) can generate
// accurate documentation for endpoints that return this DTO. We document each field's
// type, description and example values to improve the generated API contract.

import { UserListItemDto } from './UserListItemDto';
// Import the item DTO so we can describe the list element type precisely in Swagger.
// Keeping a dedicated UserListItemDto ensures the paginated wrapper remains generic
// and the item shape is defined in one place.

/**
 * PaginatedUsersDto
 *
 * Purpose:
 * - Acts as a simple, explicit wrapper for paginated responses from admin user list endpoints.
 * - By using a dedicated DTO we make the response contract explicit for consumers
 *   and for tools like Swagger / OpenAPI, TypeScript typing, and automated tests.
 *
 * Design notes:
 * - data: typed to an array of UserListItemDto so the element schema is reused.
 * - total: total number of matching items across all pages (used by UIs for pagination).
 * - page: current page number (1-based) — keeps the API simple and predictable.
 * - pageSize: number of items returned per page (server-side enforced cap recommended).
 *
 * Why document with ApiProperty:
 * - Swagger/OpenAPI generation needs explicit metadata for arrays and nested DTOs.
 * - Provides better developer experience (examples, descriptions, types) in generated docs.
 */
export class PaginatedUsersDto {
  @ApiProperty({
    description: 'List of users for the current page.',
    type: UserListItemDto,
    isArray: true,
    example: [
      {
        id: 'user_123',
        email: 'alice@example.com',
        name: 'Alice',
        isActive: true,
        emailVerifiedAt: null,
        lastLoginAt: null,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: null,
        roles: ['admin'],
      },
    ],
  })
  // `data` contains the items for the requested page. We prefer a typed DTO array
  // instead of untyped any[] so consumers and docs have a concrete schema.
  data!: UserListItemDto[];

  @ApiProperty({
    description:
      'Total number of matching users (across all pages). Useful for client-side pagination UI.',
    example: 123,
    type: Number,
  })
  // `total` is the authoritative count for pagination. Keep it as a number to allow
  // arithmetic operations on the client.
  total!: number;

  @ApiProperty({
    description: 'Current page number (1-based).',
    example: 1,
    type: Number,
  })
  // `page` is 1-based to match common UX patterns. Documenting it avoids ambiguity.
  page!: number;

  @ApiProperty({
    description:
      'Number of items returned per page (server may enforce a maximum).',
    example: 25,
    type: Number,
  })
  // `pageSize` lets clients understand the page granularity they are viewing.
  pageSize!: number;
}
// ...existing code...
