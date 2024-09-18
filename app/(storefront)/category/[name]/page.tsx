import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Category } from "@prisma/client";

export const categories = [
  {
    id: 0,
    title: "T-shirts",
    name: "tshirts" as Category,
  },
  {
    id: 1,
    title: "Oversized tees",
    name: "oversized" as Category,
  },
  {
    id: 3,
    title: "Joggers",
    name: "joggers" as Category,
  },
  {
    id: 4,
    title: "Hoodies",
    name: "hoodies" as Category,
  },
  {
    id: 5,
    title: "Shorts",
    name: "shorts" as Category,
  },
];

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
    return notFound();
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
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}