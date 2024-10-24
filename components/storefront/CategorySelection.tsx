import Image from "next/image";
import Link from "next/link";
import all from "@/public/all.png";
import men from "@/public/hoodie.jpg";
import women from "@/public/women.jpeg";

export function CategoriesSelection() {
  return (
    <div className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Shop by Category
        </h2>

        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href="/products/all"
        >
          Browse all Products &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
          <Link href={"/category/oversized"} className="block w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={all}
                alt={""}
                layout="fill"
                objectFit="cover"
                className="object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55" />
              <div className="absolute inset-0 p-6 flex items-end">
                <div>
                  <h3 className="text-white font-semibold">Oversized Tees</h3>
                  <p className="mt-1 text-sm text-white">Shop Now</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Link href="/category/hoodies">
            <Image
              src={men}
              alt="Products for men Image"
              className="object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
            />
            <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
            <div className="p-6 flex items-end sm:absolute sm:inset-0">
              <h3 className="text-white font-semibold">Hoodies</h3>
              <p className="mt-1 text-sm text-white ml-2">Shop Now</p>
            </div>
          </Link>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Link href="/category/tshirts">
            <Image
              src={women}
              alt="Women product image"
              className="object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
            />
            <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
            <div className="p-6 flex items-end sm:absolute sm:inset-0">
              <h3 className="text-white font-semibold">T-shirts</h3>
              <p className="mt-1 text-sm text-white ml-2">Shop Now</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
