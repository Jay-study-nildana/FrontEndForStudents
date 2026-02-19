// src/AdminComponents/AllUsersDTO.ts

export interface AllUsersResponseDTO {
  data: Array<{
    id: string;
    email: string;
    name: string;
    isActive: boolean;
    emailVerifiedAt: string | null;
    lastLoginAt: string | null;
    roles: string[];
    createdAt: string;
    updatedAt: string;
  }>;
  total: number;
  page: number;
  pageSize: number;
}
