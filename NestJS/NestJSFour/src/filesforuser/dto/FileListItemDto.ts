/**
 * Minimal DTO representing a file metadata item in list responses.
 * This intentionally excludes any binary data — only metadata.
 */
export class FileListItemDto {
  id!: string;
  ownerId!: string; // plain UUID string that identifies the owner (kept for admin views)
  originalName!: string;
  mimeType!: string;
  size!: number; // bytes
  isPublic!: boolean;
  createdAt!: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
