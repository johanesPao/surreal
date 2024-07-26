// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null; // Add this line
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username?: string | null; // Add this line
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string | null; // Add this line
  }
}
