"use client";
import React, { useEffect, useState } from "react";
import styles from "./blog.module.scss";
import Link from "next/link";
import Image from "next/image";
import { loader } from "@/assets";
import { motion } from "framer-motion";

async function getData() {
  const res = await fetch("api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  if (!data) {
    return (
      <div>
        <Image src={loader} alt="loader" className="image__loader" />
      </div>
    );
  }

  const sortedData = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className={styles.mainContainer}>
      <div id="community_posts-title">
        <h1>Community Posts</h1>
      </div>

      {sortedData.map((item) => (
        <div className={styles.content} key={item._id} id="postsinfo">
          <h1 className={styles.title}>{item.title}</h1>
          <p className={styles.desc}>{item.desc}</p>
          <Link
            href={`/blog/${item._id}`}
            className={styles.container}
            key={item._id}
            id="links"
          >
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className={styles.imageContainer}
            >
              <Image
                src={item.img}
                alt=""
                width={400}
                height={250}
                className={styles.image}
                id="image"
              />
            </motion.div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blog;
