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
      <Navbar />
      <main className="px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  );
}