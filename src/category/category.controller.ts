import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './models/category.model';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'The Category has been successfully created.',
    type: Category,
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Category created successfully',
      data: category,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all category' })
  @ApiResponse({
    status: 200,
    description: 'Return all category.',
    type: [Category],
  })
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Category retrieved successfully',
      data: categories,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Category by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the Category' })
  @ApiResponse({
    status: 200,
    description: 'Return the Category.',
    type: Category,
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category retrieved successfully',
      data: category,
    };
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a Category by name' })
  @ApiParam({
    name: 'name',
    type: String,
    description: 'The name of the Category',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the Category by name.',
    type: Category,
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async getCategoryByName(@Param('name') name: string) {
    const Category = await this.categoryService.findCategoryByName(name);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category retrieved successfully by name',
      data: Category,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Category' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the Category' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'The Category has been successfully updated.',
    type: Category,
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const Category = await this.categoryService.update(+id, updateCategoryDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category updated successfully',
      data: Category,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Category' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the Category' })
  @ApiResponse({
    status: 200,
    description: 'The Category has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category deleted successfully',
    };
  }
}
