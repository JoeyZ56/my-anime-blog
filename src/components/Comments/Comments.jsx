import React from "react";
import styles from "./Comments.module.scss";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const Comments = () => {
  const session = useSession();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate } = useSWR(
    `/api/comments?username=${session?.data?.user.name}`,
    fetcher
  );

  console.log(data);

  const handleSubmit = async (e) => {
    const comment = e.target[0].value;

    try {
      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          comment,
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
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.comments} onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="Add a comment..."
          className={styles.textarea}
          cols={30}
          rows={10}
        />
        <button className={styles.button}>✔️</button>

        <div className={styles.list}>
          {data?.map((comment) => (
            <li className={styles.item} key={comment._id}>
              <span className={styles.comment}>{comment.comment}</span>
              <span className={styles.username}>{comment.username}</span>
              <span
                className={styles.delete}
                onClick={() => handleDelete(comment._id)}
              >
                ❌
              </span>
            </li>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Comments;
