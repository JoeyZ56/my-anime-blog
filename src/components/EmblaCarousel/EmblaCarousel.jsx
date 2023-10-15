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
          <img src="http://wallpapercave.com/wp/wp2050597.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="https://wallpapercave.com/wp/wp6374954.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="https://images.alphacoders.com/110/1108683.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="https://theglobalcoverage.com/wp-content/uploads/2020/02/rising-of-the-shield-hero.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="https://vignette.wikia.nocookie.net/vsbattles/images/b/b9/Ac.jpg/revision/latest?cb=20160510013432" />
        </div>
        <div className={styles.imgs}>
          <img src="https://wallpapercave.com/wp/wp12302094.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="https://www.hdwallpapers.in/download/one_piece_luffy_wearing_red_coat_holding_a_hat_with_red_background_hd_anime-HD.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="http://images4.fanpop.com/image/photos/17300000/Bleach-bleach-anime-17385481-1920-1200.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="http://wallpapercave.com/wp/wc1705169.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="http://wallpapercave.com/wp/4t3KDvI.jpg" />
        </div>
        <div className={styles.imgs}>
          <img src="https://2.bp.blogspot.com/-3GOc8Bwp6Hk/XDonTbcemDI/AAAAAAAAAYE/ok3rezNKC6AjEC-woI0jZCidw4r5NAAOQCKgBGAs/w5120/legendary-super-saiyan-broly-dragon-ball-super-broly-22-8k.jpg" />
        </div>
      </div>
    </div>
  );
};
