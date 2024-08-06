// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      provider: string;
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      handleName?: string | null; // Add this line
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    provider: string;
    handleName?: string | null; // Add this line
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider: string;
    id?: string;
    handleName?: string | null;
  }
}
