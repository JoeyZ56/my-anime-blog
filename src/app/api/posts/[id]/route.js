import { NextResponse } from "next/server";
import connect from "@/lib/database";
import Post from "@/models/Post";

//http://localhost:3000/api/posts?id="___"

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const post = await Post.findById(id);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;

  try {
    console.log("Updating post with ID:", id);
    await connect();

    const post = await Post.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error("Error updating post:", err);
    return new NextResponse(`Database Error: ${err.message}`, { status: 500 });
  }
};
