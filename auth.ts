import NextAuth from "next-auth";
import LinkedInProvider, {
  LinkedInProfile,
} from "next-auth/providers/linkedin";
import TwitterProvider, { TwitterProfile } from "next-auth/providers/twitter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    LinkedInProvider({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
      async profile(profile: LinkedInProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          provider: "linkedin",
        };
      },
    }),
    TwitterProvider({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
      async profile(profile) {
        const { data } = profile;
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.profile_image_url,
          handleName: data.username,
          provider: "twitter",
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
            token = {
              ...token,
              provider: account.provider,
              id: twitterData.id,
              handleName: twitterData.username,
            };
            break;
          case "linkedin":
            const linkedinData = profile as LinkedInProfile;
            token = {
              ...token,
              provider: account.provider,
              id: linkedinData.sub,
              name: linkedinData.name,
              email: linkedinData.email,
              image: linkedinData.picture,
            };
            break;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        provider: token.provider as string,
        id: token.id as string,
        handleName: token.handleName as string,
      };

      return session;
    },
  },
});
