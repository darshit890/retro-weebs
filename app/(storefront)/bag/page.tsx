import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/interface";
import { DeleteItem } from "@/components/SubmitButtons";
import { delItem } from "@/app/action";
import { AddressForm } from "@/components/storefront/AddressForm";

export default async function BagRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;

  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
      {!cart || !cart.items || cart.items.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="mt-6 text-xl font-semibold">
            You don&apos;t have any products in your Bag
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently don&apos;t have any products in your shopping bag. Please
            add some so that you can see them right here.
          </p>
          
          <Button asChild>
            <Link href="/">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {cart.items.map((item) => (
            <div key={`${item.id}-${item.color}-${item.size}`} className="flex">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                  className="rounded-md object-cover"
                  fill
                  src={item.imageString}
                  alt="Product image"
                />
              </div>
              <div className="ml-5 flex flex-col justify-between w-full font-medium">
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.color !== 'Default' && `Color: ${item.color}`}
                    {item.color !== 'Default' && item.size !== 'Default' && ', '}
                    {item.size !== 'Default' && `Size: ${item.size}`}
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p className="font-bold">₹{item.price.toFixed(2)}</p>
                  </div>
                  <form action={delItem} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />
                    <input type="hidden" name="color" value={item.color} />
                    <input type="hidden" name="size" value={item.size} />
                    <DeleteItem />
                  </form>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-10">
            <div className="flex items-center justify-between font-medium">
              <p className="text-lg">Subtotal:</p>
              <p className="text-xl font-bold">₹{totalPrice.toFixed(2)}</p>
            </div>
            
            <AddressForm totalAmount={totalPrice} userId={user.id} />
          </div>
        </div>
      )}
    </div>
  );
}