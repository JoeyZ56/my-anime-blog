"use client";
import React from "react";
import styles from "./UserPosts.module.scss";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";

// export const metadata = {
//   title: "User Posts",
//   description: "User Posts",
// };

export default function UserPosts() {
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
      {/* <form className={styles.new} onSubmit={handleSubmit}>
        <h1>Create Post</h1>
        <input type="text" placeholder="Title" className={styles.input} />
        <input type="text" placeholder="Desc" className={styles.input} />
        <input type="text" placeholder="Image" className={styles.input} />
        <textarea
          placeholder="Tell your story..."
          className={styles.textArea}
          cols={30}
          rows={10}
        ></textarea>
        <button className={styles.button}>Send</button>
      </form> */}

      {/* New user posts */}
      <div className={styles.posts}>
        {data
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <div className={styles.post} key={post._id}>
              <div className={styles.imageContainer}>
                <Link href={`/blog/${post._id}`}>
                  <Image src={post.img} alt="" width={300} height={200} />
                </Link>
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <button
                className={styles.delete}
                onClick={() => handleDelete(post._id)}
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
