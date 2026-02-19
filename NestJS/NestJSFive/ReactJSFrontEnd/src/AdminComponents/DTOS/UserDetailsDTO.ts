// src/AdminComponents/UserDetailsDTO.ts

export interface UserDetailsDTO {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}
