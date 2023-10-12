"use client";
import Link from "next/link";
import styles from "./NavBar.module.scss";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import DarkModeToggle from "../ThemeToggle/ThemeToggle";
import Logout from "../Logout/Logout";

export default function NavBar() {
  const session = useSession();
  return (
    <div className={styles.nav}>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
      >
        <h1>Anime Blog</h1>
      </motion.div>
      <DarkModeToggle />

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

      <Logout />
    </div>
  );
}
