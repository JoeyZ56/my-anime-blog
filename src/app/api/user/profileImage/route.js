import User from "@/models/User";
import connect from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();

    const userEmail = decodeURIComponent(
      new URL(request.url).searchParams.get("email")
    );

    const user = await User.findOne({ email: userEmail });
    console.log(user, "user");

    if (user && user.profileImage) {
      return new NextResponse(
        JSON.stringify({ profileImage: user.profileImage }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.log(error, "error fetching profile image from route");
    return new NextResponse(
      JSON.stringify({ message: "Error fetching profile image" }),
      {
        status: 500,
      }
    );
  }
};
