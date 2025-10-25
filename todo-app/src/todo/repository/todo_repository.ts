import { Todo } from '@/todo/model/todo_model';

export interface TodoRepository {
  getTodos(userId: string): Promise<Array<Todo>>;
}
