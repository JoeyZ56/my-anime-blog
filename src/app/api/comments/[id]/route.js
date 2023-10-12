// pages/api/comments/[postId].js
import connect from "@/lib/database";
import Comments from "../../../../models/Comments";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await updateComment(req, res);
  } else if (req.method === "DELETE") {
    await deleteComment(req, res);
  }
}

export async function updateComment(req, res) {
  await connect();
  try {
    const comment = await Comments.findOneAndUpdate(
      { user: req.params.userId, post: req.params.postId },
      { body: req.body.body },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error updating comment" });
  }
}

export async function deleteComment(req, res) {
  await connect();
  try {
    await Comments.findOneAndDelete({
      user: req.params.userId,
      post: req.params.postId,
    });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
}
