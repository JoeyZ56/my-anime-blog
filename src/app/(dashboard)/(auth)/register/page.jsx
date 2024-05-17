"use client";
import React, { useState } from "react";
import styles from "./register.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Register = () => {
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target[0].value);
    formData.append("email", e.target[1].value);
    formData.append("password", e.target[2].value);
    formData.append("profileImage", e.target[3].files[0]);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });
      res.status === 201 &&
        router.push("/login?success=Account has been created");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={styles.container} id="register">
      <div>
        <br />
        <br />
        <h2 className={styles.title} id="reg-log-title">
          Register Today!
        </h2>
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
          type="file"
          placeholder="Profile Image"
          className={styles.input4}
          accept="image/*"
          required
        />
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <button className={styles.button} id="buttons">
            Register
          </button>
        </motion.div>
      </form>
      {error && "An error has accoured Registering!"}
      <motion.div
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, type: "tween" }}
      >
        <Link className={styles.link} id="reg-log" href="/login">
          Already a User?
        </Link>
      </motion.div>
    </div>
  );
};

export default Register;
