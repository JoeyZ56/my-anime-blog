"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import DarkModeToggle from "../ThemeToggle/ThemeToggle";
import Logout from "../Logout/Logout";
import SocialMedia from "../SocialMedia/SocialMedia";

export default function NavBar() {
  const session = useSession();
  return (
    <div className={styles.nav} id="nav">
      <motion.div
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, type: "tween" }}
      >
        <h1 className={styles.logo} id="logo">
          Anime Blog
        </h1>
      </motion.div>
      <SocialMedia />

      <Link href="/" className={styles.links} id="links">
        Dashboard
      </Link>
      {session.status === "authenticated" && (
        <Link href="/createpost" className={styles.links} id="links">
          Create Post
        </Link>
      )}
      {session.status === "authenticated" && (
        <Link href="/userposts" className={styles.links} id="links">
          My Posts
        </Link>
      )}
      {session.status != "authenticated" && (
        <Link href="/register" className={styles.links} id="links">
          Register
        </Link>
      )}

      {session.status != "authenticated" && (
        <Link href="/login" className={styles.links} id="links">
          Login
        </Link>
      )}
      <DarkModeToggle />
      <Logout />
    </div>
  );
}
