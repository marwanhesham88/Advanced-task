import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter";
export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {

      return { ...token, ...user };
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        // console.log("credentials", credentials);

        const res = await fetch(
          "https://exam.elevateegy.com/api/v1/auth/signin",
          {
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const user = await res.json();

        console.log("user data is here", user);
        if (user?.user?.email === credentials?.email) return user;
        // fetch request
        // const user = {
        //   id: "user-1",
        //   name: "user name",
        //   email: "user@gmail.com",
        //   phone: "4234252",
        //   permissionList: ["add_product", "edit_product"],
        // };

        // return user;
      },
      credentials: {
        email: {
          label: "User Name",
          placeholder: "Please enter your user Name",
          type: "text",
        },
        password: {
          label: "Password",
          placeholder: "Please enter your password",
          type: "password",
        },
      },
    }),
  ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
