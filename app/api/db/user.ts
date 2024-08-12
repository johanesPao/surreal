'use server'

import { db } from "@/drizzle/db";
import { users, InsertUser, accounts, InferAccount, InsertAccount } from "@/schema";
import { sql, and, eq } from "drizzle-orm";
import { createAccount, getAccountCount } from "./account";

export async function createUser(): Promise<InsertUser> {
  const insertedUser = await db
    .insert(users)
    .values({ id: sql<string>`gen_random_uuid()` })
    .returning();
  return insertedUser[0];
}

export async function evalUserCreationOnProviderAccount(
  provider: InferAccount["provider"],
  providerId: string,
  displayName: string,
  imageUrl: string,
  handleName?: string,
  email?: string
): Promise<InsertAccount | undefined> {
  const accountNotExist = (await getAccountCount(provider, providerId)) === 0;

  console.log(
    accountNotExist ? "Account does not exist!" : "Account registered!"
  );

  if (accountNotExist) {
    const insertedUser = await createUser();

    const account: InsertAccount = {
      provider,
      providerId,
      userId: insertedUser.id!,
      displayName,
      imageUrl,
      accountUsed: true,
      handleName: handleName ?? undefined,
      email: email ?? undefined,
    }

    const insertedAccount = await createAccount(account);

    return insertedAccount
  }
}

export async function getUserId(
  provider: InferAccount['provider'],
  providerId: string
): Promise<string | undefined> {
  const account = await db
    .select({
      userId: accounts.userId
    })
    .from(accounts)
    .where(
      and(
        eq(accounts.provider, provider),
        eq(accounts.providerId, providerId)
      )
    )
    .limit(1)

  if (account.length === 1) {
    return account[0].userId
  }
}
