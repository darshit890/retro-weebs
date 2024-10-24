'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { NavbarLinks } from "./NavbarLinks";
import { UserDropdown } from "./UserDropdown";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "./SearchBar";
import { nav } from "./NavbarData";

interface NavbarProps {
  user: any;
  total: number;
}

export function Navbar({ user, total }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-muted">
                    {user ? (
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={
                              user.picture ??
                              `https://avatar.vercel.sh/${user.given_name}`
                            }
                            alt={user.given_name || "User avatar"}
                          />
                          <AvatarFallback>
                            {user.given_name?.charAt(0)}
                            {user.family_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.given_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium">Guest</p>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <nav className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-4">
                      {nav.map((item, index) => (
                        <SheetClose key={index} asChild>
                          <Link
                            href={item.href}
                            className="flex flex-col space-y-2"
                            onClick={handleMenuClose}
                          >
                            {item.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </nav>
                  <Separator />
                  <div className="p-4">
                    {user ? (
                      <>
                        <SheetClose asChild>
                          <Button
                            variant="outline"
                            className="w-full mb-2"
                            asChild
                          >
                            <Link href="/order-history" onClick={handleMenuClose}>Order History</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/api/auth/logout" onClick={handleMenuClose}>Sign out</Link>
                          </Button>
                        </SheetClose>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <SheetClose asChild>
                          <Button variant="outline" className="w-full" asChild>
                            <LoginLink>Sign in</LoginLink>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button variant="default" className="w-full" asChild>
                            <RegisterLink>Create Account</RegisterLink>
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex md:items-center md:space-x-4 ml-2">
              <SearchBar />
            </div>
          </div>

          <div className="flex-1  ml-2 max-w-md mx-auto">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/RETROWEEBS.png"
                alt="Logo"
                width={300}
                height={130}
                className="rounded-xl"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/bag"
                  className="group flex items-center text-foreground hover:text-foreground/80"
                >
                  <ShoppingBag className="h-6 w-6" />
                  {total > 0 && (
                    <span className="ml-1 text-sm font-medium bg-primary text-primary-foreground rounded-full px-2 py-1">
                      {total}
                    </span>
                  )}
                  <span className="sr-only">Shopping bag</span>
                </Link>
                <UserDropdown
                  email={user.email as string}
                  name={user.given_name as string}
                  userImage={
                    user.picture ??
                    `https://avatar.vercel.sh/${user.given_name}`
                  }
                  family={user.family_name as string}
                />
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <LoginLink>Sign in</LoginLink>
                </Button>
                <Button variant="default" asChild>
                  <RegisterLink>Create Account</RegisterLink>
                </Button>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Search className="h-6 w-6" />
                  <span className="sr-only">Open search</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full p-0 flex-row flex justify-between pr-5">
                <div className="p-4 flex-1">
                  <SearchBar onClose={handleSearchClose} />
                </div>
                <SheetClose>
                  <Button variant="outline" size="sm" className="flex">
                    Close
                  </Button>
                </SheetClose>
              </SheetContent>
            </Sheet>
            {user ? (
              <>
                <Link href="/bag" className="mr-2">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {total > 0 && (
                      <span className="absolute top-0 right-0 -mt-1 -mr-1 text-xs bg-primary text-primary-foreground rounded-full px-1">
                        {total}
                      </span>
                    )}
                    <span className="sr-only">Shopping bag</span>
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            user.picture ??
                            `https://avatar.vercel.sh/${user.given_name}`
                          }
                          alt={user.given_name || "User avatar"}
                        />
                        <AvatarFallback>
                          {user.given_name?.charAt(0)}
                          {user.family_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/order-history">Order history</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/api/auth/logout">Sign out</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <LoginLink>
                  <User className="h-5 w-5" />
                  <span className="sr-only">Sign in</span>
                </LoginLink>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}