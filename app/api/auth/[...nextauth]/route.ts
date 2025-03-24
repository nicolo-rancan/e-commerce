import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/drizzle/db";
import { users as userSchema } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      /*console.log("\n\n\n\n");
      console.log(user);
      console.log(profile);
      console.log("\n\n\n\n");*/

      if (!user.email) return false;

      const users = await db.select().from(userSchema).where(eq(userSchema.email, user.email));

      if (users.length == 0) {
        await db.insert(userSchema).values({ email: user.email });
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return `${process.env.BASE_URL}/home`;
    },
    async session({ session, user, token }) {
      const users = await db.select().from(userSchema).where(eq(userSchema.email, session.user?.email!));
      session.userId = users[0].userId;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
