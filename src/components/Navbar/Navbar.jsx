import Link from "next/link";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <h1>Anime Blog</h1>

      <Link href="/" className={styles.links}>
        Dashboard
      </Link>
      <Link href="/topics" className={styles.links}>
        Topics
      </Link>
      <Link href="/createpost" className={styles.links}>
        Create Post
      </Link>
      <Link href="/register" className={styles.links}>
        Register
      </Link>
      <Link href="/login" className={styles.links}>
        Login
      </Link>
    </nav>
  );
}
