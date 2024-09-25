'use server'

import prisma from "@/lib/db";

export async function searchProducts(query: string) {
    if (!query) {
      return [];
    }
  
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
      },
      take: 10, // Limit the number of results
    });
  
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '', // Get the first image or an empty string if no images
    }));
  }