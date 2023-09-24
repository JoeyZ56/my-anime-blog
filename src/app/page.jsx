import { EmblaCarousel } from "@/components/EmblaCarousel/EmblaCarousel";
import styles from "./page.module.css";
import Blog from "./blog/page";

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Dashboard</h1>
      <div>
        <EmblaCarousel />
      </div>
      <div>
        <Blog />
      </div>
    </div>
  );
}
