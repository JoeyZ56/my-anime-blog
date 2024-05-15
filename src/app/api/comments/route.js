import { NextResponse } from "next/server";
import connect from "@/lib/database";
import Comments from "@/models/Comments";

//http://localhost:3000/api/chat

export const GET = async (request) => {
  const url = new URL(request.url);
  const postId = url.searchParams.get("postId");
  const username = url.searchParams.get("username");

  try {
    await connect();

    const query = {};

    if (postId) {
      query.postId = postId;
    }

    if (username) {
      query.username = username;
    }

    const comments = await Comment.find(query);
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new NextResponse("Can not find comment by postId", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    console.log("Received data:", body); // Log the received data

    const newComment = new Comments(body);

    await connect();
    await newComment.save();
    console.log("Comment saved:", newComment); // Log the saved comment

    return new NextResponse("Comment has been created", { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
