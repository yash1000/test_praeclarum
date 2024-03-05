import { Controller, Get, Post, Put, Delete, Param, Body, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo/todo';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Todo } from './entity/todo/todo.entity';


@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'sort', required: false, type: String, description: 'Sorting field (default: created_at)' })
  @ApiQuery({ name: 'filter', required: false, type: String, description: 'Filter string for title or description' })
  getAllTodos(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'created_at',
    @Query('filter') filter: string = '',
  ): Promise<Todo[]> {
    return this.todoService.getAllTodos(page, limit, sort, filter);
  }
  

  @Get(':id')
  @ApiOperation({ summary: 'Get a Todo item by ID', description: 'Returns a specific Todo item by ID' })
  @ApiParam({ name: 'id', description: 'ID of the Todo item' })
  @ApiResponse({ status: 200, description: 'Todo item found' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  getTodoById(@Param('id') id: number) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Todo item', description: 'Creates a new Todo item' })
  @ApiBody({ type: CreateTodoDto, description: 'Todo item details' })
  @ApiResponse({ status: 201, description: 'Todo item created successfully' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    try {
      const createdTodo = await this.todoService.createTodo(createTodoDto);
      return createdTodo;
    } catch (error) {
      throw error;
    }
  }
  
  @Put(':id')
  @ApiOperation({ summary: 'Update a Todo item by ID', description: 'Updates a specific Todo item by ID' })
  @ApiParam({ name: 'id', description: 'ID of the Todo item' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Todo item updated successfully' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Todo item by ID', description: 'Deletes a specific Todo item by ID' })
  @ApiParam({ name: 'id', description: 'ID of the Todo item' })
  @ApiResponse({ status: 204, description: 'Todo item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo item not found' })
  deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }
}
