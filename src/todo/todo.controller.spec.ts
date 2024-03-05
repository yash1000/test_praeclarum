import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo/todo';
import { Todo } from './entity/todo/todo.entity';
import { TodoDataSource } from './todo.datasource';
import { NotFoundException } from '@nestjs/common';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        TodoDataSource,
        {
          provide: TodoDataSource,
          useValue: {
            getAllTodos: jest.fn(),
            getTodoById: jest.fn(),
            createTodo: jest.fn(),
            updateTodo: jest.fn(),
            deleteTodo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  describe('getAllTodos', () => {
    it('should return an array of todos', async () => {
      const result: Todo[] = [];
      jest.spyOn(service, 'getAllTodos').mockResolvedValue(result);

      expect(await controller.getAllTodos()).toBe(result);
    });

    it('should call getAllTodos method of TodoService with correct parameters', async () => {
      const getAllTodosSpy = jest.spyOn(service, 'getAllTodos');
      await controller.getAllTodos(2, 20, 'title', 'search');

      expect(getAllTodosSpy).toHaveBeenCalledWith(2, 20, 'title', 'search');
    });
  });

  describe('getTodoById', () => {
    it('should return a todo by ID', async () => {
      const result: Todo = { id: 1, title: 'Test Todo', description: 'Test Description', status: false, created_at: new Date(), updated_at: new Date() };
      jest.spyOn(service, 'getTodoById').mockResolvedValue(result);
      expect(await controller.getTodoById(1)).toBe(result);
    });

    it('should call getTodoById method of TodoService with correct ID', async () => {
      const getTodoByIdSpy = jest.spyOn(service, 'getTodoById').mockImplementation(async (id: number) => {
        if (id === 1) {
          throw new NotFoundException();
        }
        return { id } as Todo; 
      });
    
      await expect(controller.getTodoById(1)).rejects.toThrow(NotFoundException);
    
      const result = await controller.getTodoById(2);
    
      expect(getTodoByIdSpy).toHaveBeenCalledWith(2);
      expect(result).toEqual({ id: 2 });
    });
  });


  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = { title: 'New Todo', description: 'New Description' };
      const result: Todo = { id: 2, title: 'New Todo', description: 'New Description', status: false, created_at: new Date(), updated_at: new Date() };
      jest.spyOn(service, 'createTodo').mockResolvedValue(result);

      expect(await controller.createTodo(createTodoDto)).toBe(result);
    });

    it('should call createTodo method of TodoService with correct CreateTodoDto', async () => {
      const createTodoSpy = jest.spyOn(service, 'createTodo');
      const createTodoDto: CreateTodoDto = { title: 'New Todo', description: 'New Description' };
      await controller.createTodo(createTodoDto);

      expect(createTodoSpy).toHaveBeenCalledWith(createTodoDto);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo by ID', async () => {
      const updateTodoDto: UpdateTodoDto = { title: 'Updated Todo', description: 'Updated Description', status: true };
      const existingTodo: Todo = { id: 1, title: 'Test Todo', description: 'Test Description', status: false, created_at: new Date(), updated_at: new Date() };

      jest.spyOn(service, 'getTodoById').mockResolvedValue(existingTodo);

      const updatedTodo: Todo = { ...existingTodo, ...updateTodoDto };
      jest.spyOn(service, 'updateTodo').mockResolvedValue(updatedTodo);

      expect(await controller.updateTodo(1, updateTodoDto)).toBe(updatedTodo);
    });

    it('should call updateTodo method of TodoService with correct ID and UpdateTodoDto', async () => {
      const updateTodoSpy = jest.spyOn(service, 'updateTodo');
      const updateTodoDto: UpdateTodoDto = { title: 'Updated Todo', description: 'Updated Description', status: true };

      jest.spyOn(service, 'getTodoById').mockResolvedValue({ id: 1, title: 'Test Todo', description: 'Test Description', status: false, created_at: new Date(), updated_at: new Date() });

      await controller.updateTodo(1, updateTodoDto);

      expect(updateTodoSpy).toHaveBeenCalledWith(1, updateTodoDto);
    });
  });
  describe('deleteTodo', () => {
    it('should delete a todo by ID', async () => {
      jest.spyOn(service, 'deleteTodo').mockResolvedValue(undefined);

      expect(await controller.deleteTodo(1)).toBeUndefined();
    });

    it('should call deleteTodo method of TodoService with correct ID', async () => {
      const deleteTodoSpy = jest.spyOn(service, 'deleteTodo');
      await controller.deleteTodo(1);

      expect(deleteTodoSpy).toHaveBeenCalledWith(1);
    });
  });
});
