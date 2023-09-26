import User from "@/models/User";
import { connect } from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("user has been created", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(err.message);
  }
};
