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

export default function Page() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State for filter selections
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]); // Book condition filter
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]); // Book category filter
  const [selectedType, setSelectedType] = useState<string[]>([]); // Class type filter

  // State for sorting option
  const [sortOption, setSortOption] = useState("newest"); // Default sort by newest

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
        </div>
      </div>
    </div>
  );
}
