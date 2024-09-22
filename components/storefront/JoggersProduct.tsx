

import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import Link from "next/link";

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      category: "joggers",
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return data;
}

export function JoggersProducts() {
  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="flex flex-row justify-between items-center">
      <h2 className="text-2xl font-extrabold tracking-tight">Joggers</h2>
      <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href="/category/joggers"
        >
          Browse all Products &rarr;
        </Link>
      </div>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedproducts />
      </Suspense>
      </div>
    </>
  );
}

async function LoadFeaturedproducts() {
  noStore();
  const data = await getData();

  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}