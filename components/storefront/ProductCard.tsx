import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Product } from '@/app/(storefront)/category/page';

interface ProductCardProps {
  item: any;
}

export function ProductCard({ item }: ProductCardProps) {
  return (
    <Link href={`/product/${item.id}`}>
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((image: string, index: any) => (
            <CarouselItem key={index}>
              <div className="relative h-[330px]">
                <Image
                  src={image}
                  alt={`${item.name} - Image ${index + 1}`}
                  fill
                  className="object-cover object-center w-full h-full rounded-t-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-xl truncate">{item.name}</h2>
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ₹{item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
    </Link>
  );
}

export function LoadingProductCard() {
  return (
    <div className="rounded-lg shadow-md">
      <Skeleton className="w-full h-[330px] rounded-t-lg" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
}