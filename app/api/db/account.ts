import { db } from "@/drizzle/db";
import { InferAccount, InsertAccount, accounts } from "@/schema";
import { and, count, eq, sql } from "drizzle-orm";

export async function getAccountCount(
  provider: InferAccount["provider"],
  providerId: string
): Promise<number> {
  const response = await db
    .select({ value: count(accounts.accountId) })
    .from(accounts)
    .where(
      and(eq(accounts.provider, provider), eq(accounts.providerId, providerId))
    );

  return response[0].value;
}

export async function createAccount(
  account: InsertAccount
): Promise<InsertAccount> {
  const insertedAccount = await db
    .insert(accounts)
    .values({
      ...account,
      accountId: sql<string>`gen_random_uuid()`,
    })
    .returning();

  return insertedAccount[0];
}
