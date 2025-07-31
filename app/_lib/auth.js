import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, name: user.name });
        }

        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async session({ session, user }) {
      try {
        const guest = await getGuest(session.user.email);
        session.user.guestId = guest.id;
        return session;
      } catch (error) {
        console.error("Session error:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
