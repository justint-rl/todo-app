import { PostgresTodoRepository } from '../repository/postgres/postgres_todo_repository';

import { db } from '@/db/index';

export const todoRepository = new PostgresTodoRepository(db);
