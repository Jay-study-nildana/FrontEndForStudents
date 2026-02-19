import { Injectable } from '@nestjs/common';

import { AdminUserService } from './repositories/adminpanel.repository.interface';
import { AdminUserServiceImpl } from './repositories/prisma-adminpanel.repository';
import { ListUsersDto } from './dto/ListUsersDto';
import { PaginatedUsersDto } from './dto/PaginatedUsersDto';
import { UserListItemDto } from './dto/UserListItemDto';

/**
 * Facade service for the admin panel controllers.
 *
 * This service delegates user-related admin operations to the
 * AdminUserService implementation (AdminUserServiceImpl).
 *
 * Note: Ensure AdminUserServiceImpl is registered as a provider in the AdminModule
 * so Nest's DI can inject it here.
 */
@Injectable()
export class AdminpanelService {
  constructor(private readonly adminUserService: AdminUserServiceImpl) {}

  /**
   * Return a paginated list of users according to the provided filters.
   */
  async listUsers(query: ListUsersDto): Promise<PaginatedUsersDto> {
    return this.adminUserService.listUsers(query);
  }

  /**
   * Return a single user mapped to UserListItemDto or null if not found.
   */
  async getUserById(id: string): Promise<UserListItemDto | null> {
    return this.adminUserService.getUserById(id);
  }

  /**
   * Return all users without requiring any query parameters.
   * Delegates to the repository implementation which is responsible for mapping
   * and excluding sensitive fields.
   */
  async listAllUsers(): Promise<UserListItemDto[]> {
    return this.adminUserService.listAllUsers();
  }

  /**
   * Assign a role to a user and return the updated user DTO (or null if not found).
   * Delegates to the repository implementation.
   */
  async assignRoleToUser(
    id: string,
    role: string,
  ): Promise<UserListItemDto | null> {
    return this.adminUserService.assignRoleToUser(id, role);
  }

  /**
   * Return all role names available in the system.
   * Delegates to the repository implementation which queries the roles table.
   */
  async listRoles(): Promise<string[]> {
    return this.adminUserService.listRoles();
  }
}
