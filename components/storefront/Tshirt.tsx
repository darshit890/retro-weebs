import { Suspense } from "react"
import { unstable_noStore as noStore } from "next/cache"
import prisma from "@/lib/db"
import { LoadingProductCard, ProductCard } from "./ProductCard"
import Link from "next/link"

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      category: "oversized",
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
  })

  return data
}

export function TshirtProducts() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-0">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2 sm:mb-0">Oversized Tees</h2>
        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href="/category/oversized"
        >
          Browse all Products &rarr;
        </Link>
      </div>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedProducts />
      </Suspense>
    </div>
  )
}

async function LoadFeaturedProducts() {
  noStore()
  const data = await getData()

  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function LoadingRows() {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  )
}