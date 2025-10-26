import { Todo } from '../model/todo_model';

export interface TodoRepository {
  getTodos(userId: string): Promise<Array<Todo>>;

  createTodo(todo: Todo): Promise<Todo>;

  updateTodo(todo: Todo): Promise<Todo>;

  deleteTodo(id: string): Promise<Todo>;
}
