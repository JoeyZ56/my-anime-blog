import User from "@/models/User";
import { connect } from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",

      async authorize(credentials) {
        //checks if user exists
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Password or email is incorrect!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  page: {
    error: "/login",
  },
});

//when passing session is going to be a GEt, when passig user info its going to be a POST

export { handler as GET, handler as POST };
