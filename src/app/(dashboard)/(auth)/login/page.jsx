"use client";
import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (session.status === "authenticated") {
      router?.push("/");
    }

    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [session, params, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <br />
      <br />
      <h1 className={styles.title} id="titles">
        Welcome Back!
      </h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />

        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <button className={styles.button} id="buttons">
            Login
          </button>
        </motion.div>
        <br />
        {error && error}
      </form>

      <motion.div
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, type: "tween" }}
      >
        <Link className={styles.link} id="reg-log" href="/register">
          Create new account
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;
