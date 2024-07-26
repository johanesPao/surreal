import NextAuth from "next-auth";
import LinkedInProvider, {
  LinkedInProfile,
} from "next-auth/providers/linkedin";
import TwitterProvider, { TwitterProfile } from "next-auth/providers/twitter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PostgresAdapter(pool),
  providers: [
    LinkedInProvider({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
      profile(profile: LinkedInProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    TwitterProvider({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
      profile(profile) {
        const { data } = profile;
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.profile_image_url,
          username: data.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    async signIn({ profile }) {
      if (profile) {
        return true;
      } else {
        return "/";
      }
    },
    async jwt({ token, profile, account }) {
      if (account && profile) {
        switch (account.provider) {
          case "twitter":
            const twitterData = profile.data as TwitterProfile;
            token.username = twitterData.username;
            break;
          case "linkedin":
            const linkedinData = profile as LinkedInProfile;
            token.name = linkedinData.name;
            (token.email = linkedinData.email),
              (token.image = linkedinData.picture);
            // LinkedIn specific token info yang dibutuhkan
            break;
        }
        // const data = profile.data as TwitterProfile;
        // token.username = data.username; // Ensure the username is stored in the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username as string | null; // Type assertion for TypeScript
      return session;
    },
  },
});
