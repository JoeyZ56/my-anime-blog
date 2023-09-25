"use client";
import { useState } from "react";

import styles from "./CreateForm.module.scss";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState();
  const [content, setCentent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFileChange = () => {
    setFile(URL.createObjectURL(e.target.file[0]));
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>Create a new Post</h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.form} id="flex__center">
        <label>Title</label>
        <input
          className={styles.title}
          type="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <label>Description</label>
        <textarea
          className={styles.description}
          type="text"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          required
        />

        <label>Content</label>
        <textarea
          className={styles.content}
          type="text"
          onChange={(e) => setCentent(e.target.value)}
          value={content}
          required
        />

        <label>Add Image</label>
        <div>
          <input
            className={styles.img}
            type="file"
            onChange={handleFileChange}
          />
          <img src={file} />
        </div>
      </form>

      {/* add image file uploader */}
      <div className={styles.submit}>
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}
