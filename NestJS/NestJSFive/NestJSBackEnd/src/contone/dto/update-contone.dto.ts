// import { PartialType } from '@nestjs/mapped-types';
// import { CreateContoneDto } from './create-contone.dto';

// export class UpdateContoneDto extends PartialType(CreateContoneDto) {}

//below explicit definition can also be used instead of PartialType

//This is because, I was not getting the DTO schema in the swagger UI. Using PartialType was not generating the schema properly.
//  So, I have defined the UpdateContoneDto explicitly similar to CreateContoneDto but with all fields optional.

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
