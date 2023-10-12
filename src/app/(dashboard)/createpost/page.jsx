"use client";
import React from "react";
import styles from "./CreatePost.module.scss";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

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

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.newPost} onSubmit={handleSubmit}>
        <h1>Create Post</h1>
        <input type="text" placeholder="Title" className={styles.input} />
        <input type="text" placeholder="Desc" className={styles.input} />
        <input type="text" placeholder="Image" className={styles.input} />
        <textarea
          placeholder="What unhinged anime thoughts do you have today?"
          className={styles.content}
          cols={30}
          rows={10}
        ></textarea>
        <button className={styles.button}>Send</button>
      </form>

      {/* New user posts
      <div className={styles.posts}>
        {data?.map((post) => (
          <div className={styles.post} key={post._id}>
            <div className={styles.imageContainer}>
              <Image src={post.img} alt="" width={300} height={200} />
            </div>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <span
              className={styles.delete}
              onClick={() => handleDelete(post._id)}
            >
              X
            </span>
          </div>
        ))}
      </div> */}
    </div>
  );
}
