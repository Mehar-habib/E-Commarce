"use client"; // Marks this as a Client Component in Next.js

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
// Import book data from constants
import { books, filters } from "@/constant/BookData";
import Link from "next/link";
// React hooks for state management
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import BookLoader from "@/constant/BookLoader";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Page() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State for filter selections
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]); // Book condition filter
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]); // Book category filter
  const [selectedType, setSelectedType] = useState<string[]>([]); // Class type filter
  const [sortOption, setSortOption] = useState("newest"); // Default sort by newest
  const [isLoading, setIsLoading] = useState(false);

  // Constants
  const bookPerPage = 6; // Number of books to display per page

  /**
   * Toggles a filter item in the specified section
   * @param section - The filter section ('condition', 'category', or 'classType')
   * @param item - The filter item to toggle
   */
  const toggleFilter = (section: string, item: string) => {
    // Helper function to update filter array
    const updateFilter = (prev: string[]) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item) // Remove if already exists
        : [...prev, item]; // Add if doesn't exist

    // Update the appropriate state based on section
    switch (section) {
      case "condition":
        setSelectedCondition(updateFilter);
        break;
      case "category":
        setSelectedCategory(updateFilter);
        break;
      case "classType":
        setSelectedType(updateFilter);
        break;
    }

    // Reset to first page whenever filters change
    setCurrentPage(1);
  };

  /**
   * Filters books based on selected criteria
   * @returns Array of filtered books
   */
  const filterBooks = books.filter((book) => {
    // Check if book matches selected conditions (or if no conditions selected)
    const conditionMatch =
      selectedCondition.length === 0 ||
      selectedCondition
        .map((cond) => cond.toLowerCase())
        .includes(book.condition.toLowerCase());

    // Check if book matches selected types (or if no types selected)
    const typeMatch =
      selectedType.length === 0 ||
      selectedType
        .map((cond) => cond.toLowerCase())
        .includes(book.classType.toLowerCase());

    // Check if book matches selected categories (or if no categories selected)
    const categoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory
        .map((cond) => cond.toLowerCase())
        .includes(book.category.toLowerCase());

    // Only include books that match all active filters
    return conditionMatch && typeMatch && categoryMatch;
  });

  /**
   * Sorts the filtered books based on selected sort option
   * @returns Array of sorted books
   */
  const sortedBooks = [...filterBooks].sort((a, b) => {
    switch (sortOption) {
      case "newest": // Sort by most recently added
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest": // Sort by least recently added
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "price-low": // Sort by price (low to high)
        return a.finalPrice - b.finalPrice;
      case "price-high": // Sort by price (high to low)
        return b.finalPrice - a.finalPrice;
      default: // No sorting
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedBooks.length / bookPerPage);
  const paginatedBooks = sortedBooks.slice(
    (currentPage - 1) * bookPerPage,
    currentPage * bookPerPage
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.round(((price - finalPrice) / price) * 100);
    }
    return 0;
  };
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span>/</span>
          <span>Books</span>
        </nav>
        <h1 className="mb-8 text-3xl font-bold">
          Find from over 1000s of used books online
        </h1>
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="space-y-6">
            <Accordion
              type="multiple"
              className="bg-white p-6 border rounded-lg"
            >
              {Object.entries(filters).map(([key, values]) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="text-lg font-semibold text-blue-500">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 space-y-2">
                      {values.map((value) => (
                        <div
                          key={value}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={value}
                            checked={
                              key === "condition"
                                ? selectedCondition.includes(value)
                                : key === "classType"
                                ? selectedType.includes(value)
                                : selectedCategory.includes(value)
                            }
                            onCheckedChange={() => toggleFilter(key, value)}
                          />
                          <label
                            htmlFor={value}
                            className="font-medium text-sm leading-none"
                          >
                            {value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <>
                <BookLoader />
              </>
            ) : paginatedBooks.length ? (
              <>
                <div className="flex justify-between">
                  <div className="mb-8 text-xl font-semibold">
                    Buy Second Hands Books, Used Books Online In Pakistan
                  </div>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-low">
                        Price (Low to High)
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price (High to Low)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedBooks.map((book) => (
                    <motion.div
                      key={book._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="group relative overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-2xl bg-white border-0">
                        <CardContent className="p-0">
                          <Link href={`/books/${book._id}`}>
                            <div className="relative">
                              <Image
                                src={book.images[0]}
                                alt={book.title}
                                width={400}
                                height={300}
                                className="h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute left-0 top-0 z-10 flex flex-col gap-2 p-2">
                                {calculateDiscount(
                                  book.price,
                                  book.finalPrice
                                ) > 0 && (
                                  <Badge className="bg-orange-600/90 text-white hover:bg-orange-700">
                                    {calculateDiscount(
                                      book.price,
                                      book.finalPrice
                                    )}
                                    % Off
                                  </Badge>
                                )}
                              </div>

                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm transition-opacity duration-300 hover:bg-white group-hover:opacity-100"
                              >
                                <Heart className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>

                            <div className="p-4 space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-orange-500 line-clamp-2">
                                  {book.title}
                                </h3>
                              </div>
                              <p className="text-sm text-zinc-400">
                                {book.author}
                              </p>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-black">
                                  Rs{book.finalPrice}
                                </span>
                                {book.price && (
                                  <span className="text-sm text-zinc-400 line-through">
                                    Rs{book.price}
                                  </span>
                                )}
                              </div>

                              <div className="flex justify-between items-center text-xs text-zinc-400">
                                <span>{formatDate(book.createdAt)}</span>
                                <span>{book.condition}</span>
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />
                        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
