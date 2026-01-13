// ...existing code...
import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminpanelService } from './adminpanel.service';

import { ListUsersDto } from './dto/ListUsersDto';
import { PaginatedUsersDto } from './dto/PaginatedUsersDto';
import { UserListItemDto } from './dto/UserListItemDto';

import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

// Swagger / OpenAPI decorators imported to document the controller surface.
// - ApiTags groups endpoints under "Admin Panel" in the generated UI.
// - ApiOperation provides a short summary for each endpoint.
// - ApiOkResponse / ApiNotFoundResponse describe response shapes and status codes.
// - ApiQuery documents query parameters (used here to expose ListUsersDto query fields).
// - ApiParam documents route parameters (UUID id).
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { ApiBody } from '@nestjs/swagger';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

// Admin-only endpoint — requires token with role 'admin'
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiTags('Admin Panel') // Groups this controller's endpoints in Swagger UI.
@Controller('adminpanel')
export class AdminpanelController {
  constructor(private readonly adminpanelService: AdminpanelService) {}

  /**
   * GET /adminpanel/users
   *
   * - Uses ValidationPipe({ transform: true, whitelist: true }) so query strings are
   *   transformed into the DTO types and extraneous properties are stripped.
   *
   * Swagger annotations below:
   * - ApiOperation: human-readable summary shown in the UI.
   * - ApiOkResponse: declares the successful response type (PaginatedUsersDto).
   * - ApiQuery: documents each accepted query parameter from ListUsersDto so Swagger shows
   *   explicit query fields (search, role, isActive, page, pageSize).
   */
  @Get('users')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'List users (paginated) with optional filters' })
  @ApiOkResponse({
    description: 'Paginated list of users matching the provided filters.',
    type: PaginatedUsersDto,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description:
      'Search term matched against name or email (case-insensitive, contains).',
    type: String,
  })
  @ApiQuery({
    name: 'role',
    required: false,
    description: 'Filter users by role name (exact match).',
    type: String,
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description:
      'Filter by active status. Accepts boolean or "true"/"false" string in query.',
    type: Boolean,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (1-based).',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Page size (maximum 200).',
    type: Number,
    example: 25,
  })
  async listUsers(@Query() query: ListUsersDto): Promise<PaginatedUsersDto> {
    return this.adminpanelService.listUsers(query);
  }

  /**
   * GET /adminpanel/users/:id
   *
   * Swagger annotations:
   * - ApiOperation: summary for the endpoint.
   * - ApiParam: documents the :id route parameter (UUID format).
   * - ApiOkResponse: successful response shape (UserListItemDto).
   * - ApiNotFoundResponse: documents 404 when user is not found.
   */
  @Get('users/:id')
  @ApiOperation({ summary: 'Get a single user by UUID' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user to retrieve',
    required: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiOkResponse({
    description: 'User details',
    type: UserListItemDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserListItemDto> {
    const user = await this.adminpanelService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  /**
   * GET /adminpanel/users/all
   *
   * - Returns all users without pagination or filters. Useful for small admin tools
   *   or internal utilities. Beware of large result sets in production.
   *
   * Swagger annotations:
   * - ApiOperation: summary for the endpoint.
   * - ApiOkResponse: documents a successful response returning an array of UserListItemDto.
   */
  @Get('alltheusers')
  @ApiOperation({ summary: 'List all users (no pagination or filters)' })
  @ApiOkResponse({
    description: 'Array of all users (minimal DTO, sensitive fields excluded).',
    type: UserListItemDto,
    isArray: true,
  })
  async listAllUsers(): Promise<UserListItemDto[]> {
    return this.adminpanelService.listAllUsers();
  }

  @Post('users/:id/roles')
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user to assign the role to',
    required: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        role: { type: 'string', example: 'admin' },
      },
      required: ['role'],
    },
    description: 'Role name to assign to the user',
  })
  @ApiOkResponse({ description: 'Updated user details', type: UserListItemDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async assignRoleToUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body('role') role: string,
  ): Promise<UserListItemDto> {
    const user = await this.adminpanelService.assignRoleToUser(id, role);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Get('roles')
  @ApiOperation({ summary: 'List all available role names' })
  @ApiOkResponse({
    description: 'Array of role names',
    type: String,
    isArray: true,
  })
  async listRoles(): Promise<string[]> {
    return this.adminpanelService.listRoles();
  }
}
