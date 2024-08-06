import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "@/drizzle/db";

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "./drizzle/migrations" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

main();
