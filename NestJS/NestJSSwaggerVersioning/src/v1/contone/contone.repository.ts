// Optional repository interface + in-memory implementation.
// Using an interface lets you swap in a DB-backed repo later.

import { Contone } from './entities/contone.entity';
import { CreateContoneDto } from './dto/create-contone.dto';
import { UpdateContoneDto } from './dto/update-contone.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; // npm i uuid @types/uuid (optional)

export interface IContoneRepository {
	create(dto: CreateContoneDto): Contone;
	findAll(): Contone[];
	findOne(id: string): Contone | undefined;
	update(id: string, dto: UpdateContoneDto): Contone;
	remove(id: string): void;
}

@Injectable()
export class InMemoryContoneRepository implements IContoneRepository {
	private items = new Map<string, Contone>();

	create(dto: CreateContoneDto): Contone {
		const now = new Date();
		const entity: Contone = {
			id: uuidv4(), // or use numeric counter
			title: dto.title,
			description: dto.description,
			createdAt: now,
			updatedAt: now,
		};
		this.items.set(entity.id, entity);
		return entity;
	}

	findAll(): Contone[] {
		return Array.from(this.items.values());
	}

	findOne(id: string): Contone | undefined {
		return this.items.get(id);
	}

	update(id: string, dto: UpdateContoneDto): Contone {
		const existing = this.items.get(id);
		if (!existing) {
			throw new NotFoundException(`Contone ${id} not found`);
		}
		const updated: Contone = {
			...existing,
			...dto,
			updatedAt: new Date(),
		};
		this.items.set(id, updated);
		return updated;
	}

	remove(id: string): void {
		if (!this.items.delete(id)) {
			throw new NotFoundException(`Contone ${id} not found`);
		}
	}
}
