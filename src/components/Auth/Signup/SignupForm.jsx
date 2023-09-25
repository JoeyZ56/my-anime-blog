"use client";
import styles from "./SignupFrom.module.scss";
import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.title}>
          <h1>Join the Community Today</h1>
        </div>
        <label>Username</label>
        <input
          type="name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <div className={styles.submit}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
}
