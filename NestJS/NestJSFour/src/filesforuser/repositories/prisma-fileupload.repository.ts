import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import type { PassPortAuthFile } from '@prisma/client';
import { FileRepository, CreateFileRecord } from './fileupload.repository.interface';
import { FileListItemDto } from '../dto/FileListItemDto';

/**
 * Prisma-based implementation of FileRepository.
 * This implementation intentionally does NOT create any DB-level relationship
 * to the user table (ownerId is stored as plain UUID string as per your decision).
 */
@Injectable()
export class PrismaFileRepository implements FileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(record: CreateFileRecord): Promise<PassPortAuthFile> {
    const created = await this.prisma.passPortAuthFile.create({
      data: {
        ownerId: record.ownerId,
        originalName: record.originalName,
        storageName: record.storageName,
        mimeType: record.mimeType,
        size: record.size,
        checksum: record.checksum ?? null,
        isPublic: record.isPublic ?? false,
      },
    });
    return created;
  }

    private toDto(entity: PassPortAuthFile): FileListItemDto {
    const dto = new FileListItemDto();
    dto.id = entity.id;
    dto.ownerId = entity.ownerId;
    dto.originalName = entity.originalName;
    dto.mimeType = entity.mimeType;
    dto.size = entity.size;
    dto.isPublic = entity.isPublic;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt ?? null;
    dto.deletedAt = entity.deletedAt ?? null;
    return dto;
  }

  async findById(id: string): Promise<FileListItemDto | null> {
    const file = await this.prisma.passPortAuthFile.findUnique({ where: { id } });
    if (!file) return null;
    return this.toDto(file);
  }

  /**
   * Delete a file metadata record by id and return the deleted DTO.
   * Returns null if not found.
   */
  async deleteById(id: string): Promise<FileListItemDto | null> {
    // Find first to avoid Prisma throwing if not found
    const file = await this.prisma.passPortAuthFile.findUnique({ where: { id } });
    if (!file) return null;

    // Delete and return DTO based on the found record (deleted record will be returned too,
    // but using the previously fetched entity avoids extra race conditions)
    await this.prisma.passPortAuthFile.delete({ where: { id } });
    return this.toDto(file);
  }

  async listByOwner(ownerId: string, skip = 0, take = 25): Promise<FileListItemDto[]> {
    const files = await this.prisma.passPortAuthFile.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
    return files.map((f) => this.toDto(f));
  }

  // List all files (no filters). Use with care for large datasets.
  async listAll(): Promise<FileListItemDto[]> {
    const files = await this.prisma.passPortAuthFile.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return files.map((f) => this.toDto(f));
  }

  async getUrlById(id: string): Promise<string | null> {
    const file = await this.prisma.passPortAuthFile.findUnique({ where: { id } });
    if (!file) return null;

    // Use explicit FILE_BASE_URL if provided (for CDN or proxy), otherwise fall back to APP_BASE_URL or localhost.
    const configuredBase = process.env.FILE_BASE_URL || process.env.APP_BASE_URL;
    const base = configuredBase ? configuredBase.replace(/\/+$/u, '') : 'http://localhost:3000';

    // Public facing path where uploaded files are served. Default matches disk storage dir used in controller.
    const uploadsPath = (process.env.UPLOADS_URL_PATH ?? '/uploads').replace(/\/+$/u, '');

    // storageName may contain characters that need encoding
    const encodedName = encodeURIComponent(file.storageName);

    return `${base}${uploadsPath.startsWith('/') ? '' : '/'}${uploadsPath}/${encodedName}`;
  }  

}