import { NextResponse } from "next/server";
import connect from "@/lib/database";
import User from "@/models/User";

export const PUT = async (request) => {
  await connect();
  try {
    const body = await request.json();
    console.log("Received data:", body);

    const updateProfileImage = await User.findOneAndUpdate(
      { email: body.email },
      body,
      { new: true }
    );
    if (!updateProfileImage) {
      return new NextResponse("Profile Image not found", { status: 404 });
    }

    return new NextResponse("Profile Image has been updated", { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
