import mongoose from "mongoose";
import { User } from "../../models/User";

export const POST = async(req) => {
const body = await req.json();
mongoose.connect(process.env.MONGODB_URL);
const createUser = await User.create(body);
return Response.json(createUser);
}