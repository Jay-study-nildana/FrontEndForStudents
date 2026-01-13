import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateFileRecord } from './repositories/fileupload.repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { PrismaFileRepository } from './repositories/prisma-fileupload.repository';
import { FileListItemDto } from './dto/FileListItemDto';

/**
 * Service responsible for handling file upload workflow:
 * - ensure uploads directory exists
 * - accept the uploaded file (already written by multer to disk)
 * - create a metadata record via the FileRepository
 *
 * This service expects the controller to use multer disk storage and to
 * pass the saved file (Express.Multer.File) to uploadFile().
 *
 * Keep this class small and focused; later you can extract storage ops
 * to a StorageService if you want to support S3/MinIO.
 */
@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);
  private readonly uploadsDir: string;

  constructor(private readonly fileRepository: PrismaFileRepository) {
    this.uploadsDir = process.env.UPLOADS_DIR ?? './uploads';

    // Ensure uploads directory exists synchronously at startup.
    // This ensures multer's disk storage can write files during requests.
    if (!existsSync(this.uploadsDir)) {
      try {
        mkdirSync(this.uploadsDir, { recursive: true });
        this.logger.log(`Created uploads directory at ${this.uploadsDir}`);
      } catch (err) {
        this.logger.error('Failed to create uploads directory', err);
        throw new InternalServerErrorException(
          'Unable to initialize uploads directory',
        );
      }
    }
  }

  /**
   * Called after multer has saved the file to disk (diskStorage).
   * The provided "file" is the Multer file object; use file.filename as the storageName.
   *
   * ownerId: string identifier for file owner (plain UUID, not DB-relational)
   * dto: additional metadata (isPublic etc.)
   */
  async uploadFile(
    ownerId: string,
    file: Express.Multer.File,
    dto: { isPublic?: boolean },
  ) {
    if (!file) {
      throw new InternalServerErrorException('No file provided');
    }

    // Multer diskStorage should have stored file under uploadsDir with filename already set.
    // We treat file.filename as the canonical storageName.
    const storageName = file.filename ?? file.originalname; // fallback (should not happen)

    const record: CreateFileRecord = {
      ownerId,
      originalName: file.originalname,
      storageName,
      mimeType: file.mimetype,
      size: file.size,
      checksum: undefined,
      isPublic: dto?.isPublic ?? false,
    };

    // Persist metadata via repository
    const created = await this.fileRepository.create(record);
    return created;
  }

  /**
   * Utility to build the absolute path for a storageName.
   * Use this in controllers when streaming files to clients.
   */
  getFilePath(storageName: string) {
    return join(this.uploadsDir, storageName);
  }

  /**
   * Helper: generate a storage filename (uuid + original extension).
   * This is used by the controller's multer filename function so repository and
   * disk names match.
   */
  generateStorageName(originalName: string) {
    const id = uuidv4();
    const ext = extname(originalName) || '';
    return `${id}${ext}`;
  }

  /**
   * Return metadata for a single file by id or null if not found.
   * Delegates to the file repository.
   */
  async findById(id: string): Promise<FileListItemDto | null> {
    return this.fileRepository.findById(id);
  }

  /**
   * Delete a file metadata record by id and return the deleted DTO (or null if not found).
   * Delegates to the repository which handles the DB delete.
   */
  async deleteById(id: string): Promise<FileListItemDto | null> {
    const deleted = await this.fileRepository.deleteById(id);
    return deleted;
  }

  /**
   * Return files owned by the given ownerId with simple pagination.
   */
  async listByOwner(
    ownerId: string,
    skip = 0,
    take = 25,
  ): Promise<FileListItemDto[]> {
    return this.fileRepository.listByOwner(ownerId, skip, take);
  }

  /**
   * Return all files (no filters). Use with care for large datasets.
   * Delegates to the repository implementation.
   */
  async listAll(): Promise<FileListItemDto[]> {
    return this.fileRepository.listAll();
  }

  /**
   * Return the public URL (if available) for the stored file by id, or null if not found.
   * Delegates to the repository which constructs the URL based on storage configuration.
   */
  async getUrlById(id: string): Promise<string | null> {
    return this.fileRepository.getUrlById(id);
  }
}
