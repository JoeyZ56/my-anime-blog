import User from "@/models/User";
import connect from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();

    const { email } = request.query;

    const user = await User.findOne({ email });

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
    return new NextResponse(
      JSON.stringify({ message: "Error fetching profile image" }),
      {
        status: 500,
      }
    );
  }
};
