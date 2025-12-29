/**
 * Defines the contract for admin user operations.
 * Currently focused on listing users with pagination and basic filters.
 */

import { ListUsersDto } from "../dto/ListUsersDto";
import { PaginatedUsersDto } from "../dto/PaginatedUsersDto";
import { UserListItemDto } from "../dto/UserListItemDto";

export interface AdminUserService {
  /**
   * Return a paginated list of users according to the provided filters.
   */
  listUsers(query: ListUsersDto): Promise<PaginatedUsersDto>;

  /**
   
   * Get a single user by id for the admin detail view.
   */
  getUserById(id: string): Promise<UserListItemDto | null>;

    /**
   * Return all users without requiring filter/query params.
   * - Useful for internal admin tooling or endpoints that need the full list.
   * - Implementations should still avoid returning sensitive fields.
   */
  listAllUsers(): Promise<UserListItemDto[]>;  

    /**
   * Assign the provided role name to the user identified by `id` and return the updated user DTO.
   *
   * Implementations should:
   * - Validate the user exists (return null or throw if not — pick one consistent behavior).
   * - Create or link the role as appropriate for the persistence layer, or return an error if the role is invalid.
   * - Be idempotent: assigning an already-present role should still return the user without duplicating roles.
   */
  assignRoleToUser(id: string, role: string): Promise<UserListItemDto | null>;

    /**
   * Return all role names available in the system.
   * Implementations should return a simple array of role name strings (e.g. ['admin','user']).
   */
  listRoles(): Promise<string[]>;
}