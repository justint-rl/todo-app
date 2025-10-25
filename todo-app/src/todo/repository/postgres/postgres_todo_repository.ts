import { eq } from 'drizzle-orm';

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
}

