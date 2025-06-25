"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Heart, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const id = params.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const router = useRouter();

  const book = {
    _id: "1",
    images: [
      "https://images.unsplash.com/photo-1604744591996-8caa3e71ee05?q=80&w=1631&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=800&auto=format&fit=crop&q=60",
    ],
    title: "The Alchemist",
    category: "Reading Books (Novels)",
    condition: "Excellent",
    classType: "B.Com",
    subject: "Fiction",
    price: 300,
    author: "Paulo Coelho",
    edition: "25th Anniversary Edition",
    description:
      "A philosophical book about a shepherd's journey to realize his dreams.",
    finalPrice: 250,
    shippingCharge: 50,
    paymentMode: "UPI",
    paymentDetails: {
      upiId: "example@upi",
    },
    createdAt: new Date("2024-01-01"),
    seller: { name: "John Doe", contact: "1234567890" },
  };
  const handleAddToCart = (productId: string) => {};
  const handleAddToWishlist = (productId: string) => {};
  const bookImage = book?.images || [];
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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/books" className="text-primary hover:underline">
            Books
          </Link>
          <span>/</span>
          <span className="text-gray-600">{book.category}</span>
          <span>/</span>
          <span className="text-gray-600">{book.title}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative h-[400px] overflow-hidden rounded-lg border bg-white shadow-md">
              <Image
                src={bookImage[selectedImage]}
                alt={book.title}
                fill
                className="object-contain"
              />
              {calculateDiscount(book.price, book.finalPrice) > 0 && (
                <span className="absolute top-2 left-0 rounded-r-lg px-2 py-1 text-xs font-medium bg-orange-600/90 text-white hover:bg-orange-700">
                  {calculateDiscount(book.price, book.finalPrice)}% Off
                </span>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto overflow-y-hidden">
              {bookImage.map((images, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                    selectedImage === index
                      ? "ring-2 ring-primary scale-105"
                      : "hover:scale-105"
                  }`}
                >
                  <Image
                    src={images}
                    alt={`${book.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* book details */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{book.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Posted {formatDate(book.createdAt)}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Share</Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToWishlist(book._id)}
                >
                  <Heart className="w-4 h-4 ml-1 fill-red-500" />
                  <span className="hidden md:inline">Add</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">Rs{book.finalPrice}</span>
                {book.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    Rs{book.price}
                  </span>
                )}

                <Badge variant="secondary" className="text-green-600">
                  Shipping Available
                </Badge>
              </div>
              <Button className="w-60 py-6 bg-blue-700">
                {isAddToCart ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Adding to cart...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" /> Buy Now
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
