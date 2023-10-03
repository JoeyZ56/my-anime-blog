import Comments from "@/models/comments";
import connect from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  try {
    await connect();

    const comments = await comments.find(username && { username });
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new NextResponse("Can not find comments by username", {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  const body = await request.json();
  const newComment = new Comments(body);

  try {
    await connect();
    await newComment.save();
    return new NextResponse("Comment has been created", { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
