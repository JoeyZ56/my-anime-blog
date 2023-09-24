import Link from "next/link";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <h1>Anime Blog</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/topics">Topics</Link>
      {/* <Link href="/posts/create">Create Post</Link> */}
      <Link href="/signup">Signup</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
