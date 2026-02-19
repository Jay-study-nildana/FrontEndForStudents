export interface ContonePostDTO {
  title: string;
  description?: string;
}

export interface ContoneResponseDTO {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
