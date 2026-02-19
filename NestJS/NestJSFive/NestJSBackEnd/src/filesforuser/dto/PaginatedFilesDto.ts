import { FileListItemDto } from './FileListItemDto';

/**
 * Simple paginated wrapper for file list responses.
 */
export class PaginatedFilesDto {
  data!: FileListItemDto[];
  total!: number;
  page!: number;
  pageSize!: number;
}
