export interface RegisterUserDto {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  name?: string | null;
  isActive: boolean;
  emailVerifiedAt?: Date | null;
  lastLoginAt?: Date | null;
  roles: string[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface AuthRepository {
  createUser(input: RegisterUserDto, roleName?: string): Promise<UserResponseDto>;
  findUserByEmail(email: string): Promise<any | null>; // full Prisma row incl. password
  findUserById(id: string): Promise<UserResponseDto | null>;
  ensureRoleExists(name: string, description?: string): Promise<void>;
  listRoles(): Promise<{ id: string; name: string; description?: string }[]>;

  // Refresh token operations:
  saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date, meta?: { ip?: string; userAgent?: string }): Promise<string>;
  findRefreshTokenByHash(tokenHash: string): Promise<any | null>;
  findRefreshTokenById(id: string): Promise<any | null>;
  revokeRefreshTokenById(id: string): Promise<void>;
  revokeAllRefreshTokensForUser(userId: string): Promise<void>;

  // role assignment helpers
  assignRoleToUser(userId: string, roleName: string): Promise<void>;
  removeRoleFromUser(userId: string, roleName: string): Promise<void>;
}