"use client";
import { Button } from "@/components/ui/button";
import {
  bannerImages,
  blogPosts,
  buySteps,
  sellSteps,
} from "@/constant/HomepageContent";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewBooks from "./components/NewBooks";
import { Card, CardContent } from "@/components/ui/card";

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

        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Buy and Sell Old Books online in Pakistan
          </h1>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <Link href="/books">
                  <div className="text-left">
                    <div className="font-sm text-sm">Start Shopping</div>
                    <div className="font-semibold">Buy Used Books</div>
                  </div>
                </Link>
              </div>
            </Button>

            <Button className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-6 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-black/20 p-2 rounded-lg group-hover:bg-black/30 transition-colors">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <Link href="/book-sell">
                  <div className="text-left">
                    <div className="font-sm text-sm">Start Selling</div>
                    <div className="font-semibold">Sell old Books</div>
                  </div>
                </Link>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* new books */}
      <NewBooks />

      {/* button */}
      <Button
        size="lg"
        className="flex mt-10 mb-10 mx-auto bg-yellow-500 px-8 py-6 rounded-xl"
      >
        <Link href="/books">
          <div className="font-sm">Explore All Books</div>
        </Link>
      </Button>
      {/* how to sell section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center font-bold mb-4">
            <h2 className="text-3xl font-bold mb-4">
              How to SELL your old books online on BookKart?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Saving some good account of money by buying used books is just 3
              steps away from you :)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-300 -z-10" />
            {sellSteps.map((step, index) => (
              <div key={index} className="relative flex flex-col h-full">
                <div className="bg-white rounded-xl p-8 shadow-lg text-center flex flex-grow flex-col">
                  <div className="absolute top-2 left-14 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-medium z-10">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 mb-2 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how to buy section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center font-bold mb-4">
            <h2 className="text-3xl font-bold mb-4">
              How to BUY second hand books online on BookKart?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Saving some good account of money by buying used books is just 3
              steps away from you :)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-300 -z-10" />
            {buySteps.map((step, index) => (
              <div key={index} className="relative flex flex-col h-full">
                <div className="bg-yellow-300 rounded-xl p-8 shadow-lg text-center flex flex-grow flex-col">
                  <div className="absolute top-2 left-14 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-medium z-10">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 mb-2 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*blog post  */}
      <section className="py-16 bg-[rgb(221,234,254)]">
        <div className="container mx-auto py-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Read from our <span className="text-primary">Blog</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.imageSrc}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105 "
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {post.icon}
                      </div>
                      <span className="flex-grow">{post.title}</span>
                    </h3>
                    <p className="text-gray-600 text-sm flex-grow">
                      {post.description}
                    </p>
                    <Button
                      variant="link"
                      className="mt-4 p-0 flex items-center text-primary cursor-pointer"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
