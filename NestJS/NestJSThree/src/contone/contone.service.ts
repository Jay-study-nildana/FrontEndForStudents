import { Injectable } from '@nestjs/common';
import { InMemoryContoneRepository } from './contone.repository';
import { CreateContoneDto } from './dto/create-contone.dto';
import { UpdateContoneDto } from './dto/update-contone.dto';
import { Contone } from './entities/contone.entity';

@Injectable()
export class ContoneService {
  constructor(private readonly repo: InMemoryContoneRepository) {}

  create(dto: CreateContoneDto): Contone {
    return this.repo.create(dto);
  }

  findAll(): Contone[] {
    return this.repo.findAll();
  }

  findOne(id: string): Contone {
    const item = this.repo.findOne(id);
    if (!item) throw new Error('NotFound'); // Controller will translate; or throw Nest NotFoundException in repo
    return item;
  }

  update(id: string, dto: UpdateContoneDto): Contone {
    return this.repo.update(id, dto);
  }

  remove(id: string): void {
    this.repo.remove(id);
  }
}