"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "@/lib/zodSchemas";
import prisma from "@/lib/db";
import { redis } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { Cart } from "@/lib/interface";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { adminUsers } from "./constants";
import { razorpay } from "@/lib/razorpay";
import { Address } from "@prisma/client";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !adminUsers.includes(user.email as string)) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  // console.log("\n\nsubmission.value");
  // console.log(submission.value);

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured,
      color1: submission.value.color1 ?? "",
      color2: submission.value.color2 ?? "",
      color3: submission.value.color3 ?? "",
      color4: submission.value.color4 ?? "",
      color5: submission.value.color5 ?? "",
      size1: submission.value.size1 ?? "",
      size2: submission.value.size2 ?? "",
      size3: submission.value.size3 ?? "",
      size4: submission.value.size4 ?? "",
      size5: submission.value.size5 ?? "",
      colorVal1: submission.value.colorVal1 ?? 0,
      colorVal2: submission.value.colorVal2 ?? 0,
      colorVal3: submission.value.colorVal3 ?? 0,
      colorVal4: submission.value.colorVal4 ?? 0,
      colorVal5: submission.value.colorVal5 ?? 0,
      sizeVal1: submission.value.sizeVal1 ?? 0,
      sizeVal2: submission.value.sizeVal2 ?? 0,
      sizeVal3: submission.value.sizeVal3 ?? 0,
      sizeVal4: submission.value.sizeVal4 ?? 0,
      sizeVal5: submission.value.sizeVal5 ?? 0,
    },
  });

  redirect("/dashboard/products");
}

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !adminUsers.includes(user.email as string)) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured,
      color1: submission.value.color1 ?? "",
      color2: submission.value.color2 ?? "",
      color3: submission.value.color3 ?? "",
      color4: submission.value.color4 ?? "",
      color5: submission.value.color5 ?? "",
      size1: submission.value.size1 ?? "",
      size2: submission.value.size2 ?? "",
      size3: submission.value.size3 ?? "",
      size4: submission.value.size4 ?? "",
      size5: submission.value.size5 ?? "",
      colorVal1: submission.value.colorVal1 ?? 0,
      colorVal2: submission.value.colorVal2 ?? 0,
      colorVal3: submission.value.colorVal3 ?? 0,
      colorVal4: submission.value.colorVal4 ?? 0,
      colorVal5: submission.value.colorVal5 ?? 0,
      sizeVal1: submission.value.sizeVal1 ?? 0,
      sizeVal2: submission.value.sizeVal2 ?? 0,
      sizeVal3: submission.value.sizeVal3 ?? 0,
      sizeVal4: submission.value.sizeVal4 ?? 0,
      sizeVal5: submission.value.sizeVal5 ?? 0,
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !adminUsers.includes(user.email as string)) {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !adminUsers.includes(user.email as string)) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !adminUsers.includes(user.email as string)) {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });

  redirect("/dashboard/banner");
}

export async function addItem(productId: string, formData: FormData) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { error: "User not authenticated" };
    }

    let cart: Cart | null = await redis.get(`cart-${user.id}`);

    const selectedProduct = await prisma.product.findUnique({
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
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
      where: {
        id: productId,
      },
    });

    if (!selectedProduct) {
      return { error: "Product not found" };
    }

    const colorValue = formData.get("color") as string;
    const sizeValue = formData.get("size") as string;

    const colorIndex = parseInt(colorValue.slice(-1));
    const sizeIndex = parseInt(sizeValue.slice(-1));

    const colorName = selectedProduct[`color${colorIndex}` as keyof typeof selectedProduct] as string || 'Default';
    const sizeName = selectedProduct[`size${sizeIndex}` as keyof typeof selectedProduct] as string || 'Default';

    const colorPrice = selectedProduct[`colorVal${colorIndex}` as keyof typeof selectedProduct] as number || 0;
    const sizePrice = selectedProduct[`sizeVal${sizeIndex}` as keyof typeof selectedProduct] as number || 0;

    const totalPrice = selectedProduct.price + colorPrice + sizePrice;

    let myCart = {} as Cart;

    if (!cart || !cart.items) {
      myCart = {
        userId: user.id,
        items: [
          {
            price: totalPrice,
            id: selectedProduct.id,
            imageString: selectedProduct.images[0],
            name: selectedProduct.name,
            quantity: 1,
            color: colorName,
            size: sizeName,
          },
        ],
      };
    } else {
      let itemFound = false;

      myCart.items = cart.items.map((item) => {
        if (item.id === productId && item.color === colorName && item.size === sizeName) {
          itemFound = true;
          item.quantity += 1;
        }
        return item;
      });

      if (!itemFound) {
        myCart.items.push({
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          price: totalPrice,
          quantity: 1,
          color: colorName,
          size: sizeName,
        });
      }
    }

    await redis.set(`cart-${user.id}`, myCart);

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error in addItem:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId");

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath("/bag");
}

export async function CheckOut(address: Address, totalAmount: number, userId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const order = await prisma.order.create({
      data: {
        amount: totalAmount * 100, // Razorpay expects amount in paise
        status: "created",
        userId: user.id,
        items: {
          create: cart.items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
            price: item.price
          }))
        },
        address: {
          create: {
            street: address.street,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
          }
        }
      },
    });

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: order.id,
      notes: {
        userId: user.id,
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    await prisma.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    };
  }
}

