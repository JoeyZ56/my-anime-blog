"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import styles from "./Logout.module.scss";
import { motion } from "framer-motion";

const Logout = () => {
  const session = useSession();
  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5, type: "tween" }}
    >
      {" "}
      {session.status === "authenticated" && (
        <button className={styles.button} id="button" onClick={signOut}>
          Logout
        </button>
      )}
    </motion.div>
  );
};

export default Logout;
