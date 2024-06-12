import User from "@/models/User";
import connect from "@/lib/database";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  const { id, name, email, password, profileImage } = await request.json();
  await connect();
  try {
    const updateUserInfo = await User.findOneAndUpdate(id, {
      name,
      email,
      password,
      profileImage,
    });

    if (!updateUserInfo) {
      return new NextResponse("User not found!", { status: 404 });
    }

    await updateUserInfo.save();
    return new NextResponse("User has been updated", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
