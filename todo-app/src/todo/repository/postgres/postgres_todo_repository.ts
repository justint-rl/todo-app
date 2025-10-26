import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/db/index';
import { todoPgTable } from '@/db/schema';

import { TodoRepository } from '../todo_repository';
import { Todo, TodoStatus } from '../../model/todo_model';

export class PostgresTodoRepository implements TodoRepository {
  async getTodos(userId: string): Promise<Array<Todo>> {
    const queryResult = await db
      .select()
      .from(todoPgTable)
      .where(eq(todoPgTable.userId, userId));

    const todoList = queryResult.map(todo => ({
      ...todo,
      status: todo.status as TodoStatus,
    }));

    return todoList;
  }

  async createTodo(todo: Todo): Promise<Todo> {
    const newTodo = {
      id: uuidv4(),
      userId: todo.userId,
      title: todo.title,
      description: todo.description,
      status: todo.status,
    };

    const [insertedTodo] = await db
      .insert(todoPgTable)
      .values(newTodo)
      .returning();

    return {
      ...insertedTodo,
      status: insertedTodo.status as TodoStatus,
    };
  }
}

