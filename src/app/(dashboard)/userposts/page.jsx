"use client";
import React from "react";
import styles from "./UserPosts.module.scss";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import Footer from "@/components/Footer/Footer";

export default function UserPosts() {
  const session = useSession();
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  console.log(data);

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
    <>
      <div className={styles.container}>
        <div className={styles.posts}>
          {data
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <div className={styles.post} key={post._id}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <motion.div
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, type: "tween" }}
                  className={styles.imageContainer}
                >
                  <Link href={`/blog/${post._id}`}>
                    <Image src={post.img} alt="" width={300} height={200} />
                  </Link>
                </motion.div>

                <motion.div
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, type: "tween" }}
                  className={styles.buttons}
                >
                  <button
                    className={styles.delete}
                    id="buttons"
                    onClick={() => handleDelete(post._id)}
                  >
                    X
                  </button>
                  {/* <button
                  className={styles.update}
                  onClick={() => handleUpdate(post._id)}
                >
                  Update
                </button> */}
                </motion.div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
