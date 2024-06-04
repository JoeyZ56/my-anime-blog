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
          <Image src={emblaPics.soloLeveling} alt="pics" />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.jjkn} alt="pics" />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.blackClover} alt="pics" />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.myHeroAcidamia} alt="pics" />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.onePiece} alt="pics" />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.konosuba} alt="pics" />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.joblessReincarnation} alt="pics" />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.kaiju} alt="pics" />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.demonSlayer} alt="pics" />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.naruto} alt="pics" />
        </div>
        <div className={styles.imgs}>
          <Image src={emblaPics.asassinationClassroom} alt="pics" />
        </div>
      </div>
    </div>
  );
};
