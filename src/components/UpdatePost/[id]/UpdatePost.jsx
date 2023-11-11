"use client";
import React, { useState, useEffect } from "react";
import styles from "./UpdatePost.module.scss";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function UpdatePost() {
  const router = useRouter();
  const session = useSession();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { mutate } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  // Destructure id from router.query
  const { id } = router.query || {};
  console.log("router.query:", router.query);
  console.log("ID from router:", id);

  const [postData, setPostData] = useState({});

  useEffect(() => {
    const getPost = async () => {
      if (id) {
        console.log("Fetching post with ID:", id);
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        setPostData(data);
      }
    };

    getPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateSubmit = {
      title: e.target[0].value,
      desc: e.target[1].value,
      img: e.target[2].value,
      content: e.target[3].value,
      username: session.data.user.name,
    };

    console.log("ID in handleSubmit:", id);
    console.log("updateSubmit:", updateSubmit);
    try {
      await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(updateSubmit),
      });
      mutate();
      router.push("/userposts");
    } catch (error) {
      console.log("Error updating post", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.updatePost} onSubmit={handleSubmit}>
        <h1>Update Post</h1>
        <input
          type="text"
          placeholder="Title"
          className={styles.title}
          value={postData.title}
        />
        <input
          type="text"
          placeholder="Description"
          className={styles.desc}
          value={postData.desc}
        />
        <input
          type="text"
          placeholder="Image URL"
          className={styles.image}
          value={postData.img}
        />
        <textarea
          placeholder="Content"
          className={styles.content}
          cols={30}
          rows={10}
          defaultValue={postData.content}
        ></textarea>
        <button type="submit" className={styles.submit}>
          Update
        </button>
      </form>
    </div>
  );
}
