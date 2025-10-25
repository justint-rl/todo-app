import { Todo } from '../model/todo_model';
import { TodoRepository } from '../repository/todo_repository';

class TodoService {
  private todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async GetTodos(userId: string): Promise<Array<Todo>> {
    if (!userId || userId.trim().length === 0) {
      return Promise.resolve([]);
    }
    return this.todoRepository.getTodos(userId);
  }
}
