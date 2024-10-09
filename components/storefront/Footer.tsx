import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, X, Youtube } from 'lucide-react'
import { FaThreads } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300 z-50">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto md:px-6 max-w-7xl">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">About RetroWeebs</h3>
            <p className="text-sm">
              Your one-stop shop for premium anime merchandise since 2024. Bringing your favorite characters to life through high-quality products.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2">
                <li>
                  <Link href={`/`} className="text-sm hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href={`/category`} className="text-sm hover:text-white transition-colors">
                    Category
                  </Link>
                </li>
                <li>
                  <Link href={`/products/all`} className="text-sm hover:text-white transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href={`/category/hoodies`} className="text-sm hover:text-white transition-colors">
                    Hoodies
                  </Link>
                </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Help Center</h3>
            <ul className="space-y-2">
                <li >
                  <Link href={`/shipping-policy`} className="text-sm hover:text-white transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li >
                  <Link href={`/cancellation-policy`} className="text-sm hover:text-white transition-colors">
                    Cancellation and Refund Policy
                  </Link>
                </li>
                <li >
                  <Link href={`/contact`} className="text-sm hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61566622491582" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/retro.pvt.ltd/?next=%2F&hl=en" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://x.com/RetroWeebs" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/company/104784339/admin/dashboard/" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Linkedin</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://www.threads.net/@retro.pvt.ltd" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Threads</span>
                <FaThreads  className="h-6 w-6" />
              </a>
              <a href="https://in.pinterest.com/055a8lmmne2b4cpvpeaz9pgqfkpm5k/" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Pinterest</span>
                <FaPinterestP  className="h-6 w-6" />
              </a>
            </div>
            
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Retroweebs. All Rights Reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-sm hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}