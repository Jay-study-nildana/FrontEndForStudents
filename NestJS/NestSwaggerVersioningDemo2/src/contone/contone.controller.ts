import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  Version,
} from '@nestjs/common';
import { ContoneService } from './contone.service';
import { CreateContoneDto } from './dto/create-contone.dto';
import { UpdateContoneDto } from './dto/update-contone.dto';
import { Contone } from './entities/contone.entity';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('contone')
@Controller('contone')
export class ContoneController {
  constructor(private readonly service: ContoneService) {}

  @Post()
  @ApiOperation({ summary: 'Create a contone' })
  @ApiBody({ type: CreateContoneDto })
  @ApiCreatedResponse({ description: 'The contone has been created.', type: Contone })
  create(@Body() dto: CreateContoneDto) {
    return this.service.create(dto);
  }
  @Version('1')
  @Get()
  @ApiOperation({ summary: 'Get all contones' })
  @ApiOkResponse({ description: 'List of contones', type: [Contone] })
  findAllV1() {
    return this.service.findAll();
  }

  @Version('3')
  @Get()
  @ApiOperation({ summary: 'Get all contones' })
  @ApiOkResponse({ description: 'List of contones', type: [Contone] })
  findAllV3() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contone by id' })
  @ApiParam({ name: 'id', description: 'Contone id' })
  @ApiOkResponse({ description: 'The contone', type: Contone })
  @ApiNotFoundResponse({ description: 'Contone not found' })
  findOne(@Param('id') id: string) {
    try {
      return this.service.findOne(id);
    } catch {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a contone' })
  @ApiParam({ name: 'id', description: 'Contone id' })
  @ApiBody({ type: UpdateContoneDto })
  @ApiOkResponse({ description: 'Updated contone', type: Contone })
  @ApiNotFoundResponse({ description: 'Contone not found' })
  update(@Param('id') id: string, @Body() dto: UpdateContoneDto) {
    try {
      return this.service.update(id, dto);
    } catch {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contone' })
  @ApiParam({ name: 'id', description: 'Contone id' })
  @ApiOkResponse({ description: 'Deletion result', schema: { example: { success: true } } })
  @ApiNotFoundResponse({ description: 'Contone not found' })
  remove(@Param('id') id: string) {
    try {
      this.service.remove(id);
      return { success: true };
    } catch {
      throw new NotFoundException();
    }
  }
}