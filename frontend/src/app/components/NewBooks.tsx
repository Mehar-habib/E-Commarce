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
  // State for current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3); // Cycle through 3 slides
    }, 5000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Navigation handlers
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3); // Previous slide with wrap-around
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3); // Next slide with wrap-around
  };

  // Calculate discount percentage
  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.round(((price - finalPrice) / price) * 100);
    }
    return 0;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-12">
          Newly Added Books
        </h2>

        <div className="relative">
          {books.length > 0 ? (
            <>
              {/* Book Carousel */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {/* Render 3 slides (each containing 3 books) */}
                  {[0, 1, 2].map((slideIndex) => (
                    <div key={slideIndex} className="flex-none w-full">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Display 3 books per slide */}
                        {books
                          .slice(slideIndex * 3, slideIndex * 3 + 3)
                          .map((book) => (
                            <Card key={book._id} className="relative">
                              <CardContent className="p-4">
                                <Link href={`books/${book._id}`}>
                                  {/* Book Image with Discount Badge */}
                                  <div className="relative">
                                    <Image
                                      src={book.images[0]}
                                      alt={book.title}
                                      width={200}
                                      height={300}
                                      className="mb-4 h-[200px] w-full object-cover rounded-md"
                                    />
                                    {/* Show discount badge if applicable */}
                                    {calculateDiscount(
                                      book.price,
                                      book.finalPrice
                                    ) > 0 && (
                                      <span className="absolute left-0 top-2 rounded-r-lg bg-red-500 px-2 py-1 text-xs font-medium text-white">
                                        {calculateDiscount(
                                          book.price,
                                          book.finalPrice
                                        )}{" "}
                                        % Off
                                      </span>
                                    )}
                                  </div>

                                  {/* Book Title */}
                                  <h3 className="mb-2 line-clamp-2 text-sm font-medium">
                                    {book.title}
                                  </h3>

                                  {/* Price and Condition */}
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

                                  {/* Buy Now Button */}
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

              {/* Navigation Arrows */}
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

              {/* Slide Indicators */}
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
            // Empty State
            <p className="text-center text-gray-500">No Books to display</p>
          )}
        </div>
      </div>
    </section>
  );
}
