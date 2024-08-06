import {
  timestamp,
  text,
  primaryKey,
  serial,
  pgEnum,
  uuid,
  boolean,
  pgTable,
} from "drizzle-orm/pg-core";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const pool = new Pool({ connectionString });
export const db = drizzle(pool);

export const EProvider = pgEnum("provider", ["linkedin", "twitter"]);

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
  content: text("content").notNull(),
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

// export const users = pgTable("user", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: text("name"),
//   email: text("email").unique(),
//   emailVerified: timestamp("email_verified", { mode: "date" }),
//   image: text("image"),
// });

// export const accounts = pgTable(
//   "account",
//   {
//     userId: text("user_id")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     type: text("type").$type<AdapterAccountType>().notNull(),
//     provider: text("provider").notNull(),
//     providerAccountId: text("provider_account_id").notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: text("token_type"),
//     scope: text("scope"),
//     id_token: text("id_token"),
//     session_state: text("session_state"),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//   })
// );

// export const sessions = pgTable("session", {
//   sessionToken: text("session_token").primaryKey(),
//   userId: text("user_id")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   expires: timestamp("expires", { mode: "date" }).notNull(),
// });

// export const verificationTokens = pgTable(
//   "verification_token",
//   {
//     identifier: text("identifier").notNull(),
//     token: text("token").notNull(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (verificationToken) => ({
//     compositePk: primaryKey({
//       columns: [verificationToken.identifier, verificationToken.token],
//     }),
//   })
// );

// export const authenticators = pgTable(
//   "authenticator",
//   {
//     credentialID: text("credential_id").notNull().unique(),
//     userId: text("user_id")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     providerAccountId: text("provider_account_id").notNull(),
//     credentialPublicKey: text("credential_public_key").notNull(),
//     counter: integer("counter").notNull(),
//     credentialDeviceType: text("credential_device_type").notNull(),
//     credentialBackedUp: boolean("credential_backed_up").notNull(),
//     transports: text("transports"),
//   },
//   (authenticator) => ({
//     compositePk: primaryKey({
//       columns: [authenticator.userId, authenticator.credentialID],
//     }),
//   })
// );

// export const comments = pgTable(
//   "comments",
//   {
//     articleId: text("article_id").notNull(),
//     commentId: serial("comment_id"),
//     provider: text("provider").notNull(),
//     providerAccountId: text("provider_account_id").notNull(),
//     content: text("content"),
//   },
//   (table) => {
//     return {
//       parentReference: foreignKey({
//         columns: [table.provider, table.providerAccountId],
//         foreignColumns: [accounts.provider, accounts.providerAccountId],
//         name: "provider_fk",
//       }),
//       compositePK: primaryKey({
//         columns: [table.articleId, table.commentId],
//       }),
//     };
//   }
// );
