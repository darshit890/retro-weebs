import { Suspense } from 'react';
import { Category } from '@prisma/client';
import prisma from '@/lib/db';
import CategoryPageClient from '@/components/storefront/CategoryPageClient';
import { LoadingProductCard } from '@/components/storefront/ProductCard';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  size1: string;
  size2: string;
  size3: string;
  size4: string;
  size5: string;
}

async function getProducts(category?: string): Promise<Product[]> {
  return await prisma.product.findMany({
    where: {
      category: category ? { equals: category as Category } : undefined,
    },
  });
}

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const products = await getProducts(searchParams.category);

  return (
    <div className=" ">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Products</h1>
        <Suspense fallback={<LoadingUI />}>
          <CategoryPageClient initialProducts={products} />
        </Suspense>
      </div>
    </div>
  );
}

function LoadingUI() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <LoadingProductCard key={index} />
      ))}
    </div>
  );
}