"use client";
import React, { useEffect, useState } from "react";
import styles from "./UserComments.module.scss";
import Image from "next/image";
import { loader } from "@/assets";
import { motion } from "framer-motion";

async function getData() {
  const res = await fetch("/api/comments", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comment data");
  }
  return res.json();
}

const UserComments = () => {
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
  }, []);

  if (!data) {
    return (
      <div>
        <Image src={loader} alt="loader" className="image__loader" />
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      console.log(id);

      const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Comment deleted successfully");

        const updateData = await getData();
        setData(updateData);
      } else {
        console.log("Error deleting comment");
      }
    } catch (error) {
      console.log("Error deleting comment", error.message);
    }
  };

  const sortedData = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className={styles.mainContainer}>
      <div>
        <h1>Comments</h1>
      </div>
      {sortedData.map(
        (data, index) => (
          console.log(data),
          (
            <div
              className={styles.comments}
              id="comments"
              key={`data_${index}`}
            >
              <h3 className={styles.username}>{data.username}</h3>
              <p className={styles.userComments}>{data.comment}</p>

              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(data._id)}
              >
                ❌
              </button>
            </div>
          )
        )
      )}
    </div>
  );
};

export default UserComments;
