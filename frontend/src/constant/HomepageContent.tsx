import {
  BookOpen,
  Camera,
  CreditCard,
  Library,
  Store,
  Tag,
  Truck,
  Wallet,
  Search,
} from "lucide-react";

// 🎯 Banner slider images
export const bannerImages = [
  "/images/book1.jpg",
  "/images/book2.jpg",
  "/images/book3.jpg",
];

// 📰 Blog posts for homepage info cards
export const blogPosts = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=800&auto=format&fit=crop&q=60",
    title: "Where and how to sell old books online?",
    description:
      "Get started with selling your used books online and earn money from your old books.",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1604744591996-8caa3e71ee05?q=80&w=1631&auto=format&fit=crop&q=60",
    title: "What to do with old books?",
    description:
      "Learn about different ways to make use of your old books and get value from them.",
    icon: <Library className="w-6 h-6 text-primary" />,
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1492539438225-2666b2a98f93?w=800&auto=format&fit=crop&q=60",
    title: "What is BookKart?",
    description:
      "Discover how BookKart helps you buy and sell used books online easily.",
    icon: <Store className="w-6 h-6 text-primary" />,
  },
];

// 💸 Sell flow steps
export const sellSteps = [
  {
    step: "Step 1",
    title: "Post an ad for selling used books",
    description:
      "Post an ad on BookKart describing your book details to sell your old books online.",
    icon: <Camera className="h-8 w-8 text-primary" />,
  },
  {
    step: "Step 2",
    title: "Set the selling price for your books",
    description: "Set the price for your books at which you want to sell them.",
    icon: <Tag className="h-8 w-8 text-primary" />,
  },
  {
    step: "Step 3",
    title: "Get paid into your UPI/Bank account",
    description:
      "You will get money into your account once you receive an order for your book.",
    icon: <Wallet className="h-8 w-8 text-primary" />,
  },
];

// 📚 Buy flow steps
export const buySteps = [
  {
    step: "Step 1",
    title: "Select the used books you want",
    description: "Search from over thousands of used books listed on BookKart.",
    icon: <Search className="h-8 w-8 text-primary" />,
  },
  {
    step: "Step 2",
    title: "Place the order by making payment",
    description:
      "Then simply place the order by clicking on the 'Buy Now' button.",
    icon: <CreditCard className="h-8 w-8 text-primary" />,
  },
  {
    step: "Step 3",
    title: "Get the books delivered at your doorstep",
    description: "The books will be delivered to you at your doorstep!",
    icon: <Truck className="h-8 w-8 text-primary" />,
  },
];
