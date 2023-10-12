"use client";
import Link from "next/link";
import styles from "./NavBar.module.scss";
import { useSession } from "next-auth/react";

import DarkModeToggle from "../ThemeToggle/ThemeToggle";
import Logout from "../Logout/Logout";

export default function NavBar() {
  const session = useSession();
  return (
    <div className={styles.nav}>
      <div>
        <h1>Anime Blog</h1>
      </div>
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
