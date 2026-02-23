import { IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateContoneDto {
	@ApiPropertyOptional({
		example: 'Updated Contone Title',
		description: 'Title of the contone',
		maxLength: 200,
	})
	@IsOptional()
	@IsString()
	@Length(1, 200)
	title?: string;

	@ApiPropertyOptional({
		example: 'Updated description for the contone',
		description: 'Detailed description',
		maxLength: 1000,
	})
	@IsOptional()
	@IsString()
	@Length(0, 1000)
	description?: string;
}
// ...existing code...
