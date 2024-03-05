import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoDataSource } from './todo.datasource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/todo/todo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoDataSource],
})
export class TodoModule {}
