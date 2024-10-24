import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/interface";
import { Navbar } from "./Navbar";

export async function NavbarWrapper() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return <Navbar user={user} total={total} />;
}