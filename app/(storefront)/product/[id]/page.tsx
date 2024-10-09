import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/components/storefront/ImageSlider";
import { addItem } from "@/app/action";
import { ProductDetails } from "./_component/ProductDetails";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
      color1: true,
      color2: true,
      color3: true,
      color4: true,
      color5: true,
      size1: true,
      size2: true,
      size3: true,
      size4: true,
      size5: true,
      colorVal1: true,
      colorVal2: true,
      colorVal3: true,
      colorVal4: true,
      colorVal5: true,
      sizeVal1: true,
      sizeVal2: true,
      sizeVal3: true,
      sizeVal4: true,
      sizeVal5: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  const addProducttoShoppingCart = addItem.bind(null, data.id);

  const colorOptions = [
    { value: "color1", label: data.color1, price: data.colorVal1 },
    { value: "color2", label: data.color2, price: data.colorVal2 },
    { value: "color3", label: data.color3, price: data.colorVal3 },
    { value: "color4", label: data.color4, price: data.colorVal4 },
    { value: "color5", label: data.color5, price: data.colorVal5 },
  ].filter((option) => option.label);

  const sizeOptions = [
    { value: "size1", label: data.size1, price: data.sizeVal1 },
    { value: "size2", label: data.size2, price: data.sizeVal2 },
    { value: "size3", label: data.size3, price: data.sizeVal3 },
    { value: "size4", label: data.size4, price: data.sizeVal4 },
    { value: "size5", label: data.size5, price: data.sizeVal5 },
  ].filter((option) => option.label);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6 max-w-7xl mx-auto md:px-6 px-4 lg:px-8">
        <ImageSlider images={data.images} />
        <ProductDetails
          name={data.name}
          description={data.description}
          basePrice={data.price}
          colorOptions={colorOptions}
          sizeOptions={sizeOptions}
          addProductToShoppingCart={addProducttoShoppingCart}
        />
      </div>
      
      <div className="mt-16 max-w-7xl mx-auto md:px-6 px-4 lg:px-8">
        <FeaturedProducts />
      </div>
    </>
  );
}