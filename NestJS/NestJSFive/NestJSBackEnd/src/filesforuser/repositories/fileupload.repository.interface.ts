import type { PassPortAuthFile } from '@prisma/client';
import { FileListItemDto } from '../dto/FileListItemDto';

/**
 * Data required to create a file metadata record in the repository.
 */
export interface CreateFileRecord {
  ownerId: string;
  originalName: string;
  storageName: string;
  mimeType: string;
  size: number;
  checksum?: string | null;
  isPublic?: boolean;
}

/**
 * Repository interface for file metadata operations.
 * Keep this small for now; we only need create for the upload flow,
 * but other methods are present for completeness and future use.
 */
export interface FileRepository {
  create(record: CreateFileRecord): Promise<PassPortAuthFile>;
  // Return a DTO for a single file (or null if not found)
  findById(id: string): Promise<FileListItemDto | null>;

  // Return the deleted file's DTO (or null if not found). Returning the DTO
  // can be useful to confirm deletion to callers; change to void if you prefer.
  deleteById(id: string): Promise<FileListItemDto | null>;

  // List files for an owner as DTOs
  listByOwner(
    ownerId: string,
    skip?: number,
    take?: number,
  ): Promise<FileListItemDto[]>;
  // List all files (no filters). Use with care for large datasets.
  listAll(): Promise<FileListItemDto[]>;

  // Return the publicly accessible URL for the stored file, or null if not found.
  // Implementations should construct the full URL (including host/path) based on
  // storage configuration (local uploads dir, CDN, or cloud storage).
  getUrlById(id: string): Promise<string | null>;
}
