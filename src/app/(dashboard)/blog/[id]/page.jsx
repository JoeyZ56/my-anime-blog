import React from "react";
import styles from "./postId.module.scss";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

//use generate  meta data for dynamic pages
export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);

  return (
    <div className={styles.container} id="postsinfo">
      <div className={styles.author}>
        {/* <Link href={`/blog${params.id}`} className={styles.link}> */}
        {data.profileImage && (
          <Image
            src={data.profileImage}
            alt="profile image"
            width={40}
            height={40}
            className={styles.profileImage}
          />
        )}
        {/* </Link> */}
        <span className={styles.username}>{data.username}</span>
      </div>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <h3 className={styles.desc}>{data.desc}</h3>
        </div>
        <div className={styles.imageContainer}>
          <Image src={data.img} alt="" fill={true} className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{data.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;