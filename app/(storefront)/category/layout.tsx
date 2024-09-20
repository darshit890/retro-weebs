import { Footer } from "@/components/storefront/Footer";
import { Navbar } from "@/components/storefront/Navbar";
import { type ReactNode } from "react";
export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">{children}</main>
    </>
  );
}