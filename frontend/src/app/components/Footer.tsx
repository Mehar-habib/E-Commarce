// Import icons from Lucide React
import {
  Clock,
  Facebook,
  HeadphonesIcon,
  Instagram,
  Shield,
  Twitter,
  Youtube,
} from "lucide-react";

// Next.js specific imports
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content container */}
      <div className="container mx-auto px-4 py-12">
        {/* Grid layout for footer sections */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* About Us Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">ABOUT US</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer">
                <Link href="/about-us" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link href="/contact-us" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              USEFUL LINKS
            </h3>
            <ul className="space-y-2">
              <li className="cursor-pointer">
                <Link href="/how-it-works" className="hover:text-white">
                  How it works?
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link href="/" className="hover:text-white">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">POLICIES</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer">
                <Link href="/terms-of-use" className="hover:text-white">
                  Terms Of Use
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Description Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              STAY CONNECTED
            </h3>
            {/* Social Media Icons */}
            <div className="mb-4 flex space-x-4">
              <Link href="#" className="hover:text-white" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-white" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-white" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
            {/* Company Description */}
            <p className="text-sm">
              BookKart is a free platform where you can buy second hand books at
              very cheap prices. Buy used books online like college books,
              school books, much more near you.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Secure Payment Feature */}
              <div className="flex items-center gap-4 rounded-xl p-6 shadow-sm">
                <div className="rounded-full p-3">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure Payment</h3>
                  <p className="text-sm text-gray-500">
                    100% Secure Online Transaction
                  </p>
                </div>
              </div>

              {/* Trust Feature */}
              <div className="flex items-center gap-4 rounded-xl p-6 shadow-sm">
                <div className="rounded-full p-3">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">BookKart Trust</h3>
                  <p className="text-sm text-gray-500">
                    Money transferred safely after confirmation
                  </p>
                </div>
              </div>

              {/* Support Feature */}
              <div className="flex items-center gap-4 rounded-xl p-6 shadow-sm">
                <div className="rounded-full p-3">
                  <HeadphonesIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Customer Support</h3>
                  <p className="text-sm text-gray-500">
                    Friendly Customer Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Copyright and Payment Methods Section */}
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
          {/* Copyright Notice */}
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BookKart. All rights reserved.
          </p>

          {/* Payment Method Icons */}
          <div className="flex items-center space-x-4">
            <Image
              src="/icons/visa.svg"
              alt="Visa payment method"
              width={50}
              height={30}
              className="filter brightness-20 invert"
            />
            <Image
              src="/icons/jazz_cash.png"
              alt="Jazz Cash payment method"
              width={50}
              height={30}
              className="filter brightness-90 invert"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
