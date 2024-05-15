import { NextResponse } from "next/server";
import connect from "@/lib/database";
import Bio from "@/models/Bio";

export const GET = async (request) => {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get("email");

  try {
    // Ensure database connection is established
    await connect();

    const query = {};

    if (userEmail) {
      query.email = userEmail;
    }

    // Query the Bio model
    const bio = await Bio.findOne(query);

    // Check if bio is empty
    if (!bio || bio.length === 0) {
      return new NextResponse("Bio not found", { status: 404 });
    }

    // Return bio data if found
    return new NextResponse(JSON.stringify(bio), { status: 200 });
  } catch (error) {
    // Handle database errors
    console.error("Database Error:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    console.log("Received data:", body);

    const newBio = new Bio(body);

    await connect();
    await newBio.save();
    console.log("Bio saved:", newBio);

    return new NextResponse("Bio has been created", { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
