"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import {
  CheckCircle2,
  Heart,
  Loader2,
  MapPin,
  MessageCircle,
  ShoppingCart,
  User2,
} from "lucide-react";
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
    seller: { name: "John Doe", phoneNumber: "1234567890" },
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

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Book Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="font-medium text-muted-foreground">
                      Subject/Title
                    </div>
                    <div>{book.subject}</div>
                    <div className="font-medium text-muted-foreground">
                      Course
                    </div>
                    <div>{book.classType}</div>
                    <div className="font-medium text-muted-foreground">
                      Category
                    </div>
                    <div>{book.category}</div>
                    <div className="font-medium text-muted-foreground">
                      Author
                    </div>
                    <div>{book.author}</div>
                    <div className="font-medium text-muted-foreground">
                      Edition
                    </div>
                    <div>{book.edition}</div>
                    <div className="font-medium text-muted-foreground">
                      Condition
                    </div>
                    <div>{book.condition}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{book.description}</p>
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Our Community</h3>
                <p className="text-muted-foreground">
                  we&apos;re not just another shopping website where you buy
                  from professional sellers - we are a vibrant community of
                  students, book lovers across Pakistan who deliver happiness to
                  each other!
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div>Ad Id: {book._id}</div>
                <div>Posted: {formatDate(book.createdAt)}</div>
              </div>
            </CardContent>
          </Card>

          {/* book seller details */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Sold By</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-300 flex items-center justify-center">
                    <User2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{book.seller.name}</span>
                      <Badge variant="secondary" className="text-green-600">
                        <CheckCircle2 className="h-3 w-3 ml-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Lahore
                    </div>
                  </div>
                </div>
              </div>
              {book.seller.phoneNumber && (
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                  <span>Contact: {book.seller.phoneNumber}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* how it works session */}
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">How Does It Work</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "Step 1",
                title: "Seller posts an Ad",
                description:
                  "Seller posts an ad on book kart to sell their used books.",
                image: { src: "/icons/ads.png", alt: "Post Ad" },
              },
              {
                step: "Step 2",
                title: "Buyer Pays Online",
                description:
                  "Buyer makes an online payment to book kart to buy those books.",
                image: { src: "/icons/pay_online.png", alt: "Payment" },
              },
              {
                step: "Step 3",
                title: "Seller ships the books",
                description: "Seller then ships the books to the buyer",
                image: { src: "/icons/fast-delivery.png", alt: "Shipping" },
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-amber-50 to-amber-100 border-none"
              >
                <CardHeader>
                  <Badge className="w-fit mb-2">{item.step}</Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={120}
                    height={120}
                    className="mx-auto"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
