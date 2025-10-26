import { NextRequest, NextResponse } from 'next/server';

import { Todo, TodoStatus } from '@/todo/model';
import { todoService } from '@/todo/module';

// GET /api/todos - Get all todos for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 },
      );
    }

    const userTodos = await todoService.getTodos(userId);

    return NextResponse.json(userTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 },
    );
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title, description } = body;

    if (!userId || !title) {
      return NextResponse.json(
        { error: 'userId and title are required' },
        { status: 400 },
      );
    }

    const newTodo: Todo = {
      id: '',
      userId: userId,
      title: title,
      description: description,
      status: TodoStatus.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdTodo = await todoService.createTodo(newTodo);

    return NextResponse.json(createdTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
