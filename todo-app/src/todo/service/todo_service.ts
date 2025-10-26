import { validate as validateUuid } from 'uuid';

import { Todo, TodoStatus } from '../model/todo_model';
import { TodoRepository } from '../repository/todo_repository';

export class TodoService {
  private todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async getTodos(userId: string): Promise<Array<Todo>> {
    if (!this.isValidUuid(userId)) {
      return Promise.reject("Invalid user id");
    }
    return this.todoRepository.getTodos(userId);
  }

  async createTodo(todo: Todo): Promise<Todo> {
    if (!this.isValidUuid(todo.userId)) {
      return Promise.reject("Invalid user id");
    }
    if (!this.isValidString(todo.title)) {
      return Promise.reject("Invalid todo title");
    }
    if (!this.isValidStatus(todo.status)) {
      return Promise.reject("Invalid todo status");
    }

    const newTodo = {
      ...todo,
      status: TodoStatus.TODO,
    }

    return this.todoRepository.createTodo(newTodo);
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    if (!this.isValidUuid(todo.id)) {
      return Promise.reject("Invalid todo id");
    }
    if (!this.isValidUuid(todo.userId)) {
      return Promise.reject("Invalid user id");
    }
    if (!this.isValidString(todo.title)) {
      return Promise.reject("Invalid todo title");
    }
    if (!this.isValidStatus(todo.status)) {
      return Promise.reject("Invalid todo status");
    }
    return this.todoRepository.updateTodo(todo);
  }

  async deleteTodo(todoId: string): Promise<Todo> {
    if (!this.isValidUuid(todoId)) {
      return Promise.reject("Invalid todo id");
    }
    return this.todoRepository.deleteTodo(todoId);
  }

  private isValidString(str: string): boolean {
    return !!str && str.trim().length > 0;
  }

  private isValidUuid(userId: string): boolean {
    const isValidString = this.isValidString(userId)
    const isValidUuid = validateUuid(userId);
    return isValidString && isValidUuid;
  }

  private isValidStatus(status: TodoStatus): boolean {
    return Object.values(TodoStatus).includes(status);
  }
}
