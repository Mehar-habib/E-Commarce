"use client";
import { bannerImages } from "@/constant/HomepageContent";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentImage((prev) => (prev + 1) % bannerImages.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen">
      <section className="relative h-[600px] overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              fill
              alt="Banner Image"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </section>
    </main>
  );
}
