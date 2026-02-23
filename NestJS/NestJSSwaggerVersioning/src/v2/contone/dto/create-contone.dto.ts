import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContoneDto {
	@ApiProperty({
		example: 'Sample Contone Title',
		description: 'Title of the contone',
		maxLength: 200,
	})
	@IsString()
	@Length(1, 200)
	title: string;

	@ApiPropertyOptional({
		example: 'Optional description for the contone',
		description: 'Detailed description',
		maxLength: 1000,
	})
	@IsOptional()
	@IsString()
	@Length(0, 1000)
	description?: string;
}
// ...existing code...
