import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { ProductCard } from "@/components/storefront/ProductCard";
import { categories } from "@/lib/categories";

async function getData(productCategory: string) {
  if (productCategory === "all") {
    const data = await prisma.product.findMany({
      select: {
        name: true,
        images: true,
        price: true,
        id: true,
        description: true,
      },
      where: {
        status: "published",
      },
    });
    return {
      title: "All Products",
      data: data,
    };
  }
  const category = categories.find(cat => cat.name.toLowerCase() === productCategory.toLowerCase());
  if (!category) {
    notFound();
  }
  const data = await prisma.product.findMany({
    select: {
      name: true,
      images: true,
      price: true,
      id: true,
      description: true,
    },
    where: {
      status: "published",
      category: category.name,
    },
  });
  return {
    title: category.title,
    data: data,
  };
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  noStore();
  const { data, title } = await getData(params.name);

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">{title}</h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {data.map((item) => (
            <ProductCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 my-8">No products found in this category.</p>
      )}
    </section>
  );
}