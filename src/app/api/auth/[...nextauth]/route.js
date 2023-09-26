import User from "@/models/User";
import { connect } from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",

      async authorize(credentials) {
        // Log the MongoDB URI to ensure it's correct
        console.log("MongoDB URI:", process.env.MONGO_URI);

        // Establish MongoDB connection
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
          // Log the error for debugging
          console.error("Authorization Error:", error);

          // Rethrow the error
          throw error;
        }
      },
    }),
  ],
  page: {
    error: "/login",
  },
});

export { handler as GET, handler as POST };
