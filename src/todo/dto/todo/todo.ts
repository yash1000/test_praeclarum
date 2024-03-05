import { IsNotEmpty, IsString, IsBoolean, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ description: 'The title of the Todo item (min length: 3, max length: 50)' })
  @IsNotEmpty({message: 'Title cannot be empty' })
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(50, { message: 'Title cannot be longer than 50 characters' })
  title: string;

  @ApiProperty({ description: 'The description of the Todo item (min length: 10, max length: 200)' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(200, { message: 'Description cannot be longer than 200 characters' })
  description?: string;
}

export class UpdateTodoDto {
  @ApiProperty({ description: 'The updated title of the Todo item (min length: 3, max length: 50)' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(50, { message: 'Title cannot be longer than 50 characters' })
  title: string;

  @ApiProperty({ description: 'The updated description of the Todo item (min length: 10, max length: 200)' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(200, { message: 'Description cannot be longer than 200 characters' })
  description: string;

  @ApiProperty({ description: 'The updated status of the Todo item' })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
