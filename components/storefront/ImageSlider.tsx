"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  return (
    <div className="grid gap-6 md:gap-3 items-start mx-auto">
      <div className="relative overflow-hidden rounded-lg mx-auto">
        <Image
          width={600}
          height={600}
          src={images[mainImageIndex]}
          alt="Product image"
          className="object-cover w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]  lg:w-[600px] lg:h-[600px]"
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-10 ">
        {images.map((image, index) => (
          <div
            className={cn(
              index === mainImageIndex
                ? "border-2 border-primary"
                : "border border-gray-200",
              "relative fill w-[80px] h-[80px]  overflow-hidden rounded-lg mx-auto cursor-pointer"
            )}
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt="Product Image"
              width={100}
              height={100}
              className="object-cover w-[80px] h-[80px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}