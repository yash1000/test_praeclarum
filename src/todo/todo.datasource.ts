import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Like } from 'typeorm';
import { Todo } from './entity/todo/todo.entity';
import { CreateTodoDto } from './dto/todo/todo';

@Injectable()
export class TodoDataSource {
  constructor(private readonly entityManager: EntityManager) {}

  async getAllTodos(page: number, limit: number, sort: string, filter: string): Promise<Todo[]> {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: Record<string, any> = {};

    if (filter) {
      where.title = Like(`%${filter}%`);
      where.description = Like(`%${filter}%`);
    }

    const options = {
      skip,
      take,
      order: { [sort]: 'ASC' },
      where,
    };

    return this.entityManager.find(Todo, options);
  }

  async getTodoById(id: number): Promise<Todo> {
    if (!id) {
      throw new NotFoundException('Todo ID is required for retrieval.');
    }
  
    return this.entityManager.findOne(Todo, {
      where: { id },
    });
  }
  

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.entityManager.create(Todo, createTodoDto);
    return this.entityManager.save(Todo, todo);
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    if (!todo.id) {
      throw new Error('Todo ID is required for update.');
    }
  
    return this.entityManager.save(Todo, todo);
  }
  
  async deleteTodo(id: number): Promise<void> {
    if (!id) {
      throw new Error('Todo ID is required for deletion.');
    }
  
    await this.entityManager.delete(Todo, id);
  }
  
}
