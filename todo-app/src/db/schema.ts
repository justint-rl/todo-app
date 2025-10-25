import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userPgTable = pgTable('user', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type User = typeof userPgTable.$inferSelect
export type NewUser = typeof userPgTable.$inferInsert

export const todoPgTable = pgTable('todo', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Todo = typeof todoPgTable.$inferSelect;
export type NewTodo = typeof todoPgTable.$inferInsert;
