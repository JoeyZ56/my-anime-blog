import { EmblaCarousel } from "@/components/EmblaCarousel/EmblaCarousel";
import styles from "./page.module.css";
import Blog from "./blog/page";

export default function Home() {
  return (
    <>
      <div>
        <EmblaCarousel />
      </div>
      <div>
        <Blog />
      </div>
    </>
  );
}
