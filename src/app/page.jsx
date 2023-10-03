"use client";
import { EmblaCarousel } from "@/components/EmblaCarousel/EmblaCarousel";
import styles from "./home.module.scss";
import Blog from "./(dashboard)/blog/page";
import Comments from "@/components/Comments/Comments";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <div>
        <EmblaCarousel />
      </div>
      <div>
        <Blog />
        <Comments />
      </div>
    </>
  );
}
