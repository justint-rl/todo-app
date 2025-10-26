import { Todo } from '@/todo/model/todo_model';
import { eq } from 'drizzle-orm';

export default async function Home() {
  // Replace 'demo-user' with actual user ID from auth
  const userId = 'demo-user';

  const userTodos = await db
    .select()
    .from(todoPgTable)
    .where(eq(todoPgTable.userId, userId));

  return (
    <div className="font-sans min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Todos</h1>

        {userTodos.length === 0 ? (
          <p className="text-gray-500">No todos yet. Create your first one!</p>
        ) : (
          <ul className="space-y-4">
            {userTodos.map((todo: Todo) => (
              <li
                key={todo.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    {todo.description && (
                      <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
