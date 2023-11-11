"use client";
import React, { useEffect, useState } from "react";
import styles from "./blog.module.scss";
import Link from "next/link";
import Image from "next/image";
import { loader } from "@/assets";
import { motion } from "framer-motion";
import Footer from "@/components/Footer/Footer";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        isLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="image_loader-container">
        <Image src={loader} alt="loader" className="image__loader" />
      </div>
    );
  }

  const sortedData = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (isLoading === true) {
    return (
      <div>
        <Image src={loader} alt="loader" className="image__loader" />
      </div>
    );
  } else if (isLoading === false) {
    return (
      <>
        <div className={styles.mainContainer}>
          <div className={styles.titleContainer} id="community_posts-title">
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
                    alt="item"
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
        <ScrollTopBtn />
        <Footer />
      </>
    );
  }
};

export default Blog;
