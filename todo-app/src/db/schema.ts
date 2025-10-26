import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const userPgTable = pgTable('user', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type User = typeof userPgTable.$inferSelect
export type NewUser = typeof userPgTable.$inferInsert

export const todoPgTable = pgTable('todo', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Todo = typeof todoPgTable.$inferSelect;
export type NewTodo = typeof todoPgTable.$inferInsert;
