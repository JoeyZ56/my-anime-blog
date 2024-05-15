import { NextResponse } from "next/server";
import connect from "@/lib/database";
import Bio from "@/models/Bio";

export const PUT = async (request) => {
  try {
    const body = await request.json();
    console.log("Received data:", body);

    await connect();
    const updatedBio = await Bio.findOneAndUpdate({ email: body.email }, body, {
      new: true,
    });
    if (!updatedBio) {
      return new NextResponse("Bio not found", { status: 404 });
    }

    console.log("Bio updated:", updatedBio);
    return new NextResponse("Bio has been updated", { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request) => {
  try {
    const body = await request.json();
    const deletedBio = await Bio.findOneAndDelete({ email: body.email });
    if (!deletedBio) {
      return new NextResponse("Bio not found", { status: 404 });
    }

    console.log("Bio deleted:", deletedBio);
    return new NextResponse("Bio has been deleted", { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
