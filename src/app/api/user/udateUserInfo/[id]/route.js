import { NextResponse } from "next/server";
import connect from "@/lib/database";
import User from "@/models/User";

export const PUT = async (request) => {
  try {
    const body = await request.json();

    await connect();
    const updateUserInfo = await User.findOneAndUpdate({
      username: body.username,
      email: body.email,
      password: body.password,
      new: true,
    });

    if (!updateUserInfo) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse("User has been updated", { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
