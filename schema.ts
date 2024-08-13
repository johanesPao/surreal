import {
  timestamp,
  text,
  primaryKey,
  serial,
  pgEnum,
  uuid,
  boolean,
  pgTable,
  jsonb,
} from "drizzle-orm/pg-core";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const pool = new Pool({ connectionString });
export const db = drizzle(pool);

export const EProvider = pgEnum("provider", ["linkedin", "twitter", "google"]);

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  createdAt: timestamp("created_at", {
    mode: "date",
    precision: 3,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    precision: 3,
  }).$onUpdateFn(() => new Date()),
});

export type InferUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const accounts = pgTable(
  "account",
  {
    provider: EProvider("provider").notNull(),
    providerId: text("provider_id").notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    accountId: uuid("account_id").defaultRandom().unique().notNull(),
    accountUsed: boolean("account_used").default(false),
    displayName: text("display_name").notNull(),
    handleName: text("handle_name"),
    email: text("email"),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at", {
      mode: "date",
      precision: 3,
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdateFn(() => new Date()),
  },
  (table) => {
    return {
      composedPk: primaryKey({ columns: [table.provider, table.providerId] }),
    };
  }
);

export type InferAccount = typeof accounts.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;

export const comments = pgTable("comment", {
  articleId: text("article_id").notNull(),
  commentId: serial("comment_id").notNull(),
  accountId: uuid("account_id")
    .notNull()
    .references(() => accounts.accountId, { onDelete: "cascade" }),
  content: jsonb('content').notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    precision: 3,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    precision: 3,
  }).$onUpdateFn(() => new Date()),
});

export type InferComment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;
