"use client";
import React from "react";
import styles from "./CreatePost.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { motion } from "framer-motion";

export default function CreatePost() {
  const session = useSession();
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.newPost} onSubmit={handleSubmit}>
        <h1>Create Post</h1>
        <input type="text" placeholder="Title" className={styles.input} />
        <input type="text" placeholder="Description" className={styles.input} />
        <input type="text" placeholder="Image" className={styles.input} />
        <br />
        <br />

        <textarea
          placeholder="What unhinged anime thoughts do you have today?"
          className={styles.content}
          cols={30}
          rows={10}
        ></textarea>
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <button className={styles.button} id="buttons">
            Post
          </button>
        </motion.div>
      </form>
    </div>
  );
}
