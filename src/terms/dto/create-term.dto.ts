import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateTermDto {
  @ApiProperty({
    description: 'The name of the term',
    example: 'Programming',
    type: String,
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  @Length(2, 100, { message: 'name must be between 2 and 100 characters' })
  name: string;

  @ApiProperty({
    description: 'The definition of the term',
    example:
      'Programming is the process of creating a set of instructions for a computer to perform.',
    type: String,
  })
  @IsString({ message: 'definition must be a string' })
  @IsNotEmpty({ message: 'definition should not be empty' })
  @Length(10, 500, {
    message: 'definition must be between 10 and 500 characters',
  })
  definition: string;

  @ApiProperty({
    description: 'ID of the category to which this term belongs',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'categoryId must be an integer' })
  @IsPositive({ message: 'categoryId must be a positive number' })
  categoryId: number;
}
