"use client";
import React from "react";
import styles from "./login.module.scss";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => signIn("credentials")}>
        Login
      </button>
    </div>
  );
};

export default Login;
