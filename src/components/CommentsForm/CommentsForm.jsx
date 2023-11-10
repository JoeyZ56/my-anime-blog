"use client";
import styles from "./CommentsForm.module.scss";

import { useSession } from "next-auth/react";
import useSWR from "swr";

import { motion } from "framer-motion";

export default function CommentsForm() {
  const session = useSession();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    // `/api/comments?username=${session?.data?.user.name}`,
    fetcher
  );

  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target[0].value;

    try {
      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          comment,
          username: session.data.user.name,
        }),
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.newComment} onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a comment..."
          className={styles.comment}
          cols={30}
          rows={10}
        ></textarea>
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <button type="submit" className={styles.button} id="commentButton">
            Submit
          </button>
        </motion.div>
      </form>
    </div>
  );
}
