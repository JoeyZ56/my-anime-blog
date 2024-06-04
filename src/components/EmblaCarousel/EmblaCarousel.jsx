"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./EmblaCarousel.module.scss";
import Autoplay from "embla-carousel-autoplay";
import emblaPics from "./index";
import Image from "next/image";

export const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.container}>
        <div className={styles.imgs}>
          <Image src={emblaPics.soloLeveling} />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.jjkn} />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.blackClover} />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.myHeroAcidamia} />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.onePiece} />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.konosuba} />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.joblessReincarnation} />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.kaiju} />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.demonSlayer} />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.naruto} />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.asassinationClassroom} />
        </div>
      </div>
    </div>
  );
};
