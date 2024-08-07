import { db } from "@/drizzle/db";
import { users, InsertUser, InferAccount, InsertAccount } from "@/schema";
import { sql } from "drizzle-orm";
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
) {
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
  }
}
