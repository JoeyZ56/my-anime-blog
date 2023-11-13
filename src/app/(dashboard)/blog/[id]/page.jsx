"use client";
import React from "react";
import styles from "./postId.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import CommentsForm from "@/components/CommentsForm/CommentsForm";
// import UserComments from "@/components/UserComments/UserComments";
import { loader } from "@/assets";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer/Footer";

async function getData(id) {
  console.log("Fetching data for ID:", id);
  try {
    const res = await fetch(`/api/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch data for ID ${id}. Status: ${res.status}`);
      throw new Error(`Failed to fetch data for ID ${id}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error in getData:", error);
    return notFound();
  }
}

const BlogPost = ({ params }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for ID:", params.id);
        const postData = await getData(params.id);
        console.log("Received data:", postData);
        setData(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!data) {
    return (
      <div className="image_loader-container">
        <Image src={loader} alt="loader" className="image__loader" />
      </div>
    );
  }

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
        <span className={styles.username} id="usernameID">
          {data.username}
        </span>
      </div>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <h3 className={styles.desc}>{data.desc}</h3>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt="image"
            fill={true}
            className={styles.image}
            id="postImageID"
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{data.content}</p>
      </div>
      <div>{/* <CommentsForm id={params.id} /> */}</div>
      <div>{/* <UserComments id={params.id} /> */}</div>
      <motion.div
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, type: "tween" }}
        className={styles.homeLinkContainer}
      >
        <Link className={styles.homeLink} id="homeLink" href="/">
          Dashboard
        </Link>
      </motion.div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;
