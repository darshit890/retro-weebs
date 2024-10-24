import { Footer } from "@/components/storefront/Footer";
import { NavbarWrapper } from "@/components/storefront/NavbarWrapper";
import { type ReactNode } from "react";


export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <NavbarWrapper />
      <main className="px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  );
}