import mongoose from "mongoose";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from 'next-auth/providers/github';
import {User} from "../../../../models/User"; 

const handler = NextAuth({
  secret: process.env.SECRET_KEY,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (mongoose.connection.readyState !== 1) {
          await mongoose.connect(process.env.MONGO_URL);
        }

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        const passwordOk = bcrypt.compareSync(password, user.password);
        if (!passwordOk) {
          throw new Error("Invalid password");
        }

        return user;
      }
    })
  ],
});

export { handler as GET, handler as POST };



