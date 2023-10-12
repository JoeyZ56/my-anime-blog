// pages/api/comments/index.js
import Comments from "../../../models/Comment";
import connect from "@/lib/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getComments(req, res);
  } else if (req.method === "POST") {
    await postComment(req, res);
  }
}

export async function getComments(req, res) {
  await connect();
  try {
    const comments = await Comments.find({ post: req.query.id })
      .populate("user")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ comments, message: "Comments displayed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
}

export async function postComment(req, res) {
  await connect();
  try {
    const comment = await Comments.create(req.body);
    res.status(201).json({ comment, message: "Comment created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating comment" });
  }
}
