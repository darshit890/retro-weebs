import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["tshirts", "oversized", "joggers", "hoodies", "shorts"]),
  isFeatured: z.boolean().optional(),
  color1: z.string().optional(),
  color2: z.string().optional(),
  color3: z.string().optional(),
  color4: z.string().optional(),
  color5: z.string().optional(),
  size1: z.string().optional(),
  size2: z.string().optional(),
  size3: z.string().optional(),
  size4: z.string().optional(),
  size5: z.string().optional(),
  colorVal1: z.number().optional(),
  colorVal2: z.number().optional(),
  colorVal3: z.number().optional(),
  colorVal4: z.number().optional(),
  colorVal5: z.number().optional(),
  sizeVal1: z.number().optional(),
  sizeVal2: z.number().optional(),
  sizeVal3: z.number().optional(),
  sizeVal4: z.number().optional(),
  sizeVal5: z.number().optional(),
});

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
});