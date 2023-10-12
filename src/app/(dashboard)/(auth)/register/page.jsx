"use client";
import React, { useState } from "react";
import styles from "./register.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //form elements instead of state
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const profileImage = e.target[3].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          profileImage,
        }),
      });
      res.status === 201 &&
        router.push("/login?success=Account has been created");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Register Today!</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className={styles.input1}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input2}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input3}
          required
        />
        <input
          type="text"
          placeholder="Profile Image URL"
          className={styles.input4}
        />
        <button className={styles.button}>Register</button>
      </form>
      {error && "An error has accoured Registering!"}
      <Link className={styles.link} href="/login">
        Already a User?
      </Link>
    </div>
  );
};

export default Register;
