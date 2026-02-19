export interface FileItemDTO {
  id: string;
  ownerId: string;
  originalName: string;
  mimeType: string;
  size: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
