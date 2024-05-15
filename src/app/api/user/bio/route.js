import { NextResponse } from "next/server";
import connect from "@/lib/database";
import Bio from "@/models/Bio";

export const GET = async (request) => {
  await connect();
  try {
    const userEmail = decodeURIComponent(
      new URL(request.url).searchParams.get("email")
    );
    console.log("Searching for bio with email:", userEmail);

    const bio = await Bio.findOne({ email: userEmail });
    if (!bio) {
      return new NextResponse("Bio not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(bio), {
      status: 200,
      headers: { "Content-Type": "application/ json" },
    });
  } catch (error) {
    console.error("GET Database Error:", error);
    return new NextResponse(`Database Error: ${error.message}`, {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  await connect(); // Make sure your database connection is properly established
  try {
    const { email, bio } = await request.json(); // Extract data from the request body

    if (!email || !bio) {
      return new NextResponse("Email and bio are required", {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Using findOneAndUpdate with upsert to create or update the bio
    const updatedBio = await Bio.findOneAndUpdate(
      { email },
      { $set: { bio } },
      { new: true, upsert: true, returnDocument: "after" } // Ensure this is set to handle upserts correctly
    );

    return new NextResponse(
      JSON.stringify({
        message: "Bio updated successfully",
        bio: updatedBio,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Database error, unable to update bio" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
