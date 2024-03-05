import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo/todo';
import { TodoDataSource } from './todo.datasource';

@Injectable()
export class TodoService {
  constructor(private readonly todoDataSource: TodoDataSource) {}

  async getAllTodos(page, limit, sort, filter): Promise<Todo[]> {
    return this.todoDataSource.getAllTodos(page, limit, sort, filter);
  }
  

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.todoDataSource.getTodoById(id);
    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoDataSource.createTodo(createTodoDto);
    return todo;
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const existingTodo = await this.getTodoById(id);

    const updatedTodo = {
      ...existingTodo,
      ...updateTodoDto,
    };

    return this.todoDataSource.updateTodo(updatedTodo);
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoDataSource.deleteTodo(id);
  }
}
