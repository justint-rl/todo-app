import { NextRequest, NextResponse } from 'next/server';

import { Todo } from '@/todo/model';
import { todoService } from '@/todo/module';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// PATCH /api/todos/[id] - Update a todo
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();
    // TODO: userId should eventually be pulled from JWT token
    const { title, description, status, userId } = body;

    const updateData: Todo = {
      id: id,
      userId: userId,
      title: title,
      description: description,
      status: status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };


    const updatedTodo = await todoService.updateTodo(updateData);

    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const deletedTodo = await todoService.deleteTodo(id);

    if (!deletedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
