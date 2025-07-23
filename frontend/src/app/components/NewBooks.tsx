"use client"; // Marks this as a Client Component in Next.js

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Data and Icons
import { books } from "@/constant/BookData";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Next.js Imports
import Image from "next/image";
import Link from "next/link";

// React Hooks
import { useEffect, useState } from "react";

export default function NewBooks() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.round(((price - finalPrice) / price) * 100);
    }
    return 0;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Newly Added Books
        </h2>

        <div className="relative">
          {books.length > 0 ? (
            <>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {[0, 1, 2].map((slideIndex) => (
                    <div key={slideIndex} className="flex-none w-full">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {books
                          .slice(slideIndex * 3, slideIndex * 3 + 3)
                          .map((book) => (
                            <Card key={book._id} className="relative">
                              <CardContent className="p-4">
                                <Link href={`books/${book._id}`}>
                                  <div className="relative">
                                    {book.images[0] ? (
                                      <Image
                                        src={book.images[0]}
                                        alt={book.title}
                                        width={200}
                                        height={300}
                                        className="mb-4 h-[200px] w-full object-cover rounded-md"
                                      />
                                    ) : (
                                      <div className="mb-4 h-[200px] w-full bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
                                        No Image
                                      </div>
                                    )}

                                    {calculateDiscount(
                                      book.price,
                                      book.finalPrice
                                    ) > 0 && (
                                      <span className="absolute left-0 top-2 rounded-r-lg bg-red-500 px-2 py-1 text-xs font-medium text-white">
                                        {calculateDiscount(
                                          book.price,
                                          book.finalPrice
                                        )}
                                        % Off
                                      </span>
                                    )}
                                  </div>

                                  <h3 className="mb-2 line-clamp-2 text-sm font-medium">
                                    {book.title}
                                  </h3>

                                  <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-2">
                                      <span className="text-lg font-bold">
                                        Rs{book.finalPrice}
                                      </span>
                                      {book.price && (
                                        <span className="text-sm text-muted-foreground line-through">
                                          Rs{book.price}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-zinc-400">
                                      <span>{book.condition}</span>
                                    </div>
                                  </div>

                                  <div className="pt-4">
                                    <Button className="flex float-end mb-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700">
                                      Buy Now
                                    </Button>
                                  </div>
                                </Link>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="mt-8 flex justify-center space-x-2">
                {[0, 1, 2].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => setCurrentSlide(dot)}
                    className={`w-3 h-3 rounded-full ${
                      currentSlide === dot ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${dot + 1}`}
                  ></button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No Books to display</p>
          )}
        </div>
      </div>
    </section>
  );
}
