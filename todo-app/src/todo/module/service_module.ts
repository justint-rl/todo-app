import { todoRepository } from './repository_module';
import { TodoService } from '../service/todo_service';


export const todoService = new TodoService(todoRepository);
