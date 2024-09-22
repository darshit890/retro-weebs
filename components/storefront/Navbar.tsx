import Link from "next/link"
import Image from "next/image"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { ShoppingBag, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { NavbarLinks } from "./NavbarLinks"
import { UserDropdown } from "./UserDropdown"
import { redis } from "@/lib/redis"
import { Cart } from "@/lib/interface"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export async function Navbar() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const cart: Cart | null = await redis.get(`cart-${user?.id}`)
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="Logo" width={130} height={130} />
            </Link>
            <div className="hidden md:block ml-10">
              <NavbarLinks />
            </div>
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
                  userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
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

          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-muted">
                    {user ? (
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
                            alt={user.given_name || "User avatar"}
                          />
                          <AvatarFallback>{user.given_name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.given_name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
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
                      <NavbarLinks />
                      {user && (
                        <Link
                          href="/bag"
                          className="flex items-center text-foreground hover:text-foreground/80"
                        >
                          <ShoppingBag className="h-5 w-5 mr-2" />
                          <span className="text-sm font-medium">Bag ({total})</span>
                        </Link>
                      )}
                    </div>
                  </nav>
                  <Separator />
                  <div className="p-4">
                    {user ? (
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/api/auth/logout">Sign out</Link>
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full" asChild>
                          <LoginLink>Sign in</LoginLink>
                        </Button>
                        <Button variant="default" className="w-full" asChild>
                          <RegisterLink>Create Account</RegisterLink>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}