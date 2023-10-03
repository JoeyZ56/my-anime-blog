import { NextResponse } from "next/server";
import connect from "@/lib/database";
import comments from "@/models/comments";

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await comments.findByIdAndDelete(id);

    return new NextResponse("Comment has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
