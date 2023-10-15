"use client";
import { EmblaCarousel } from "@/components/EmblaCarousel/EmblaCarousel";
import Blog from "./(dashboard)/blog/page";

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
