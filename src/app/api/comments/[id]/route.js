import { NextResponse } from "next/server";
import connect from "@/lib/database";
import Chat from "@/models/Chat";

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Chat.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Failed to delete post", { status: 500 });
  }
};
