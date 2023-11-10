import { NextResponse } from "next/server";
import connect from "@/lib/database";
import Comments from "@/models/Comments";

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Comments.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Failed to delete post", { status: 500 });
  }
};
