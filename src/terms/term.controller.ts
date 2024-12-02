import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TermsService } from './term.service';
import { Term } from './models/term.model';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';

@ApiTags('Terms')
@Controller('terms')
export class TermController {
  constructor(private readonly TermsService: TermsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Term' })
  @ApiResponse({
    status: 201,
    description: 'Term created successfully',
    type: Term,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createTermDto: CreateTermDto) {
    return this.TermsService.create(createTermDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Terms' })
  @ApiResponse({
    status: 200,
    description: 'List of Terms',
    type: [Term],
  })
  findAll() {
    return this.TermsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Term by ID' })
  @ApiResponse({ status: 200, description: 'Term found', type: Term })
  @ApiResponse({ status: 404, description: 'Term not found' })
  findOne(@Param('id') id: string) {
    return this.TermsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Term by ID' })
  @ApiResponse({
    status: 200,
    description: 'Term updated successfully',
    type: Term,
  })
  @ApiResponse({ status: 404, description: 'Term not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateTermDto: UpdateTermDto) {
    return this.TermsService.update(+id, updateTermDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Term by ID' })
  @ApiResponse({ status: 204, description: 'Term deleted successfully' })
  @ApiResponse({ status: 404, description: 'Term not found' })
  remove(@Param('id') id: string) {
    return this.TermsService.remove(+id);
  }
}
