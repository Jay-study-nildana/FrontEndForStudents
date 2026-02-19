export interface FileUploadResponseDTO {
  id: string;
  originalName: string;
  storageName: string;
  mimeType: string;
  size: number;
  isPublic: boolean;
  createdAt: string;
}
