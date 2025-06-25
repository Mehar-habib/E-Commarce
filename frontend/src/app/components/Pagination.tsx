// Import UI components
import { Button } from "@/components/ui/button";
// Import icons from Lucide React
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the props interface for TypeScript type checking
interface PaginationProps {
  currentPage: number; // Current active page number
  totalPages: number; // Total number of pages available
  onPageChange: (page: number) => void; // Callback function when page changes
}

/**
 * Pagination component for navigating through pages
 * @param {PaginationProps} props - Component props
 * @param {number} props.currentPage - Current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {function} props.onPageChange - Page change handler
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Page Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))} // Ensures page doesn't go below 1
        disabled={currentPage === 1} // Disable if on first page
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page Number Buttons */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className={currentPage === page ? "bg-blue-500 text-black" : ""}
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </Button>
        )
      )}

      {/* Next Page Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} // Ensures page doesn't exceed totalPages
        disabled={currentPage === totalPages} // Disable if on last page
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
