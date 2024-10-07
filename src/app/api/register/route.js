import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { User } from '../../models/User';

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;

  if (!pass?.length || pass.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(pass, salt);

  const createdUser = await User.create(body);
  return new Response(JSON.stringify(createdUser));
}
