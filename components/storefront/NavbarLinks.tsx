"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "Products",
    href: "/products",
    subItems: [
      { name: "All Products", href: "/products/all" },
    ],
  },
  {
    id: 2,
    name: "Categories",
    href: "/categories",
    subItems: [
      { name: "All Categories", href: "/category" },
      { name: "T-shirts", href: "/category/tshirts" },
      { name: "Shorts", href: "/category/shorts" },
      { name: "Joggers", href: "/category/joggers" },
      { name: "Hoodies", href: "/category/hoodies" },
      { name: "Oversized Tees", href: "/category/oversized" },
    ],
  },
  
];

export function NavbarLinks() {
  const pathname = usePathname();

  return (
    <div className="flex md:items-center space-x-1 flex-col gap-y-2  md:flex-row">
      {navbarLinks.map((item) => (
        <div key={item.id}>
          {item.subItems ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900">
                {item.name}
                <ChevronDown className="w-4 h-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {item.subItems.map((subItem) => (
                  <DropdownMenuItem key={subItem.href}>
                    <Link
                      href={subItem.href}
                      className={cn(
                        "w-full text-sm",
                        pathname === subItem.href
                          ? "font-medium text-primary"
                          : "text-gray-700 hover:text-gray-900"
                      )}
                    >
                      {subItem.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}