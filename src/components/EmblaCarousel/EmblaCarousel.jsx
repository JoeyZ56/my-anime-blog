"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./EmblaCarousel.module.scss";
import Autoplay from "embla-carousel-autoplay";

export const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.container}>
        <div className={styles.imgs}>
          <img src="https://media.comicbook.com/2019/06/black-clover-1175515.jpeg?auto=webp" />
        </div>
        <div className={styles.imgs}>
          <img src="https://wallpaperaccess.com/full/758946.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="https://www.denofgeek.com/wp-content/uploads/2021/01/Demon-Slayer-Kimetsu-No-Yaiba-Season-1-Tanjiro-Attack-Collage.jpg?fit=1200%2C675" />
        </div>
        <div className={styles.imgs}>
          <img src="https://picfiles.alphacoders.com/460/460297.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="https://thecinemaholic.com/wp-content/uploads/2020/09/the-rising-of-the-shield-hero-8950-1.jpg?resize=740" />
        </div>
        <div className={styles.imgs}>
          <img src="https://vignette.wikia.nocookie.net/vsbattles/images/b/b9/Ac.jpg/revision/latest?cb=20160510013432" />
        </div>
        <div className={styles.imgs}>
          <img src="https://wallpapercave.com/wp/wp12302094.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="https://ostani.me/wp-content/uploads/2019/07/Date-A-Live.jpg" />
        </div>
      </div>
    </div>
  );
};
