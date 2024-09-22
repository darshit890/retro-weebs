import { Suspense } from "react"
import { unstable_noStore as noStore } from "next/cache"
import prisma from "@/lib/db"
import { LoadingProductCard, ProductCard } from "./ProductCard"

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
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

export function FeaturedProducts() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-20">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-6">Featured Items</h2>
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