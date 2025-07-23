"use client"; // Marks this as a Client Component in Next.js

// Import UI components from ShadCN/ui library
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Redux related imports
import { toggleLoginDialog } from "@/store/slice/userSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

// Icon imports from Lucide React
import {
  BookLock,
  ChevronRight,
  FileTerminal,
  Heart,
  HelpCircle,
  Lock,
  LogOut,
  Menu,
  Package,
  PiggyBank,
  Search,
  ShoppingCart,
  User,
  User2,
} from "lucide-react";

// Next.js specific imports
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthPage from "./AuthPage";

export default function Header() {
  // State for dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Next.js router for navigation
  const router = useRouter();

  // Redux hooks
  const dispatch = useDispatch();
  const isLoginOpen = useSelector(
    (state: RootState) => state.user.isLoginDialogOpen
  );

  // Mock user data (would typically come from Redux/store)
  const user = {
    profilePicture: "",
    name: "",
    email: "",
  };
  const userPlaceholder = "";

  // Handler for login button click
  const handleLoginClick = () => {
    dispatch(toggleLoginDialog());
    setIsDropdownOpen(false);
  };

  // Protected navigation handler - checks auth before routing
  const handleProtectNavigation = (href: string) => {
    if (user) {
      router.push(href);
      setIsDropdownOpen(false);
    } else {
      dispatch(toggleLoginDialog()); // Show login dialog if not authenticated
      setIsDropdownOpen(false);
    }
  };

  // Logout handler (currently empty)
  const handleLogout = () => {};

  // Menu items configuration - dynamically changes based on auth state
  const menuItems = [
    // Conditional profile section (shown when logged in)
    ...(user && user
      ? [
          {
            href: "account/profile",
            content: (
              <div className="flex space-x-4 items-center border-b">
                <Avatar className="w-12 h-12 -ml-2 rounded-full">
                  {user?.profilePicture ? (
                    <AvatarImage alt="user_image"></AvatarImage>
                  ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-md">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </div>
            ),
          },
        ]
      : [
          {
            icon: <Lock className="h-5 w-5" />,
            label: "Login/Signup",
            onClick: handleLoginClick,
          },
        ]),

    // development purpose to views the auth page
    {
      icon: <Lock className="h-5 w-5" />,
      label: "Login/Signup",
      onClick: handleLoginClick,
    },
    // Common menu items
    {
      icon: <User className="h-5 w-5" />,
      label: "My Profile",
      onClick: () => handleProtectNavigation("/account/profile"),
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "My Order",
      onClick: () => handleProtectNavigation("/account/order"),
    },
    {
      icon: <PiggyBank className="h-5 w-5" />,
      label: "My Selling Order",
      onClick: () => handleProtectNavigation("/account/selling-products"),
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "Cart",
      onClick: () => handleProtectNavigation("/checkout/cart"),
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: "My Wishlist",
      onClick: () => handleProtectNavigation("/account/wishlist"),
    },

    // Public links
    {
      icon: <User2 className="h-5 w-5" />,
      label: "About us",
      href: "/about-us",
    },
    {
      icon: <FileTerminal className="h-5 w-5" />,
      label: "Terms & Use",
      href: "/terms-of-use",
    },
    {
      icon: <BookLock className="h-5 w-5" />,
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: "Help",
      href: "/how-it-works",
    },

    // Conditional logout button (shown when logged in)
    ...(user && [
      {
        icon: <LogOut className="h-5 w-5" />,
        label: "Logout",
        onClick: handleLogout,
      },
    ]),
  ];

  // Reusable menu items component
  const MenuItems = ({ className = "" }) => (
    <div className={className}>
      {menuItems?.map((item, index) =>
        item?.href ? (
          // Link items
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-gray-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            {item.icon}
            <span>{item?.label}</span>
            {item?.content && <div className="mt-1">{item?.content}</div>}
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
        ) : (
          // Button items
          <button
            key={index}
            className="flex w-full items-center gap-3 py-3 text-sm rounded-lg hover:bg-gray-200"
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item.label}</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </button>
        )
      )}
    </div>
  );

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Desktop Header */}
      <div className="container w-[80%] mx-auto hidden lg:flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt="desktop_logo"
            className="h-14 w-auto"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Book Name / Author / Subject / Publisher"
              className="w-full pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Sell Book Button */}
          <Link href="/book-sell">
            <Button
              variant="secondary"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
            >
              Sell Used Book
            </Button>
          </Link>

          {/* User Account Dropdown */}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gray-100 hover:bg-gray-200 text-black cursor-pointer">
                <Avatar className="w-8 h-8 rounded-full">
                  {user?.profilePicture ? (
                    <AvatarImage alt="user_image"></AvatarImage>
                  ) : userPlaceholder ? (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  ) : (
                    <User className="ml-2 mt-2" />
                  )}
                </Avatar>
                My Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-2">
              <MenuItems />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart Button with Badge */}
          <Link href="/checkout/cart">
            <div className="relative">
              <Button className="relative bg-gray-100 hover:bg-gray-200 text-black cursor-pointer">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </Button>
              {user && (
                <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs">
                  4
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="container mx-auto flex lg:hidden items-center justify-between p-4">
        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 ">
            <SheetHeader>
              <SheetTitle className="sr-only"></SheetTitle>
            </SheetHeader>
            <div className="border-b p-4">
              <Link href="/">
                <Image
                  src="/images/web-logo.png"
                  width={150}
                  height={40}
                  alt="mobile_logo"
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <MenuItems className="py-2" />
          </SheetContent>
        </Sheet>

        {/* Mobile Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt="desktop_logo"
            className="h-6 md:h-10 w-20 md:w-auto"
          />
        </Link>

        {/* Mobile Search */}
        <div className="flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search books..."
              className="w-full pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Cart */}
        <Link href="/checkout/cart">
          <div className="relative">
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
            </Button>
            {user && (
              <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs">
                4
              </span>
            )}
          </div>
        </Link>
      </div>
      <AuthPage isLoginOpen={isLoginOpen} setIsLoginOpen={handleLoginClick} />
    </header>
  );
}
