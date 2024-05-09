"use client";
import React, { useContext } from "react";
import styles from "./ThemeToggle.module.scss";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { motion } from "framer-motion";

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);

  return (
    <div className={styles.container} id="theme__container" onClick={toggle}>
      <div className={styles.icon}>🔵</div>
      <div className={styles.icon}>🔴</div>
      <motion.div
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, type: "tween" }}
        className={styles.ball}
        id="theme__ball"
        style={mode === "light" ? { left: "2px" } : { right: "2px" }}
      ></motion.div>
    </div>
  );
};

export default DarkModeToggle;
