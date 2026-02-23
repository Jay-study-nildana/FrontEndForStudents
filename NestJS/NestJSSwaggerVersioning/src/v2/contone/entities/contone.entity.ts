import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Contone {
	@ApiProperty({
		example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		description: 'Unique identifier',
	})
	id: string;

	@ApiProperty({
		example: 'Sample Contone Title',
		description: 'Title of the contone',
		maxLength: 200,
	})
	title: string;

	@ApiPropertyOptional({
		example: 'Optional description for the contone',
		description: 'Detailed description',
		maxLength: 1000,
	})
	description?: string;

	@ApiProperty({
		example: new Date().toISOString(),
		description: 'Creation timestamp',
		type: String,
		format: 'date-time',
	})
	createdAt: Date;

	@ApiPropertyOptional({
		example: new Date().toISOString(),
		description: 'Last update timestamp',
		type: String,
		format: 'date-time',
	})
	updatedAt?: Date;
}
// ...existing code...
