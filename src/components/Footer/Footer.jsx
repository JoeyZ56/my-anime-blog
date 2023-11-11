"use client";
import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className={styles.footerContainer} id="footer">
      <div className={styles.animeLinks} id="footerLinks">
        <h4>Want more Anime?</h4>
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <Link href="https://www.anime-planet.com/" target="_blank">
            <h4>Anime Planet</h4>
          </Link>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <Link href="https://myanimelist.net/news" target="_blank">
            <h4>MyAnimeList</h4>
          </Link>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <Link href="https://www.animenewsnetwork.com/" target="_blank">
            <h4>Anime News Network</h4>
          </Link>
        </motion.div>
      </div>
      <div className={styles.copyRight}>
        <p>© 2023 My Anime Blog</p>
      </div>
    </div>
  );
};

export default Footer;
