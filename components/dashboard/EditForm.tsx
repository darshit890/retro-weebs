"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "../SubmitButtons";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { type $Enums } from "@prisma/client";
import { categories } from "@/lib/categories";
import { UploadDropzone } from "@/lib/uploadthing";
import { productSchema } from "@/lib/zodSchemas";
import { editProduct } from "@/app/action";

interface iAppProps {
  data: {
    id: string;
    name: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
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
    colorVal1: number;
    colorVal2: number;
    colorVal3: number;
    colorVal4: number;
    colorVal5: number;
    sizeVal1: number;
    sizeVal2: number;
    sizeVal3: number;
    sizeVal4: number;
    sizeVal5: number;
  };
}

export function EditForm({ data }: iAppProps) {
  const [images, setImages] = useState(data.images);
  const [isFeatured, setIsFeatured] = useState(data.isFeatured);
  const [lastResult, action] = useFormState(editProduct, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      const result = parseWithZod(formData, { schema: productSchema });
      return result;
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFeaturedChange = (checked: boolean) => {
    setIsFeatured(checked);
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="productId" value={data.id} />
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can update your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                className="w-full"
                placeholder="Product Name"
              />

              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
                placeholder="Write your description right here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={data.price}
                type="number"
                placeholder="$55"
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  key={fields.isFeatured.key}
                  checked={isFeatured}
                  onCheckedChange={handleFeaturedChange}
                />
                <input
                  type="hidden"
                  name={fields.isFeatured.name}
                  value={isFeatured ? "true" : "false"}
                />
              </div>
              <p className="text-red-500">{fields.isFeatured.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={data.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={data.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg border"
                      />

                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}

              <p className="text-red-500">{fields.images.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <details>
                <summary>Color Variants</summary>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 w-full">
                  <div>
                    <Label>Color 1</Label>
                    <Input
                      key={fields.color1.key}
                      name={fields.color1.name}
                      defaultValue={data.color1}
                      type="text"
                      placeholder="Color 1"
                    />
                    <p className="text-red-500">{fields.color1.errors}</p>
                  </div>
                  <div>
                    <Label>Extra Value</Label>
                    <Input
                      key={fields.colorVal1.key}
                      name={fields.colorVal1.name}
                      defaultValue={data.colorVal1}
                      type="number"
                      placeholder="Value 1"
                    />
                    <p className="text-red-500">{fields.colorVal1.errors}</p>
                  </div>
                  <div>
                    <Label>Total</Label>
                    <Input
                      defaultValue={
                        fields.price.value && fields.colorVal1.value
                          ? Number(fields.price.value) +
                            Number(fields.colorVal1.value)
                          : 0
                      }
                      type="number"
                      placeholder="0"
                      disabled
                    />
                    <p className="text-red-500">{fields.color1.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.color2.key}
                      name={fields.color2.name}
                      defaultValue={data.color2}
                      type="text"
                      placeholder="Color 2"
                    />
                    <p className="text-red-500">{fields.color2.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.colorVal2.key}
                      name={fields.colorVal2.name}
                      defaultValue={data.colorVal2}
                      type="number"
                      placeholder="Value 2"
                    />
                    <p className="text-red-500">{fields.colorVal2.errors}</p>
                  </div>
                  <div>
                    <Input
                      defaultValue={
                        fields.price.value && fields.colorVal2.value
                          ? Number(fields.price.value) +
                            Number(fields.colorVal2.value)
                          : 0
                      }
                      type="number"
                      placeholder="0"
                      disabled
                    />
                    <p className="text-red-500">{fields.color2.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.color3.key}
                      name={fields.color3.name}
                      defaultValue={data.color3}
                      type="text"
                      placeholder="Color 3"
                    />
                    <p className="text-red-500">{fields.color3.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.colorVal3.key}
                      name={fields.colorVal3.name}
                      defaultValue={data.colorVal3}
                      type="number"
                      placeholder="Value 3"
                    />
                    <p className="text-red-500">{fields.colorVal3.errors}</p>
                  </div>
                  <div>
                    <Input
                      defaultValue={
                        fields.price.value && fields.colorVal3.value
                          ? Number(fields.price.value) +
                            Number(fields.colorVal3.value)
                          : 0
                      }
                      type="number"
                      placeholder="0"
                      disabled
                    />
                    <p className="text-red-500">{fields.color3.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.color4.key}
                      name={fields.color4.name}
                      defaultValue={data.color4}
                      type="text"
                      placeholder="Color 4"
                    />
                    <p className="text-red-500">{fields.color4.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.colorVal4.key}
                      name={fields.colorVal4.name}
                      defaultValue={data.colorVal4}
                      type="number"
                      placeholder="Value 4"
                    />
                    <p className="text-red-500">{fields.colorVal4.errors}</p>
                  </div>
                  <div>
                    <Input
                      defaultValue={
                        fields.price.value && fields.colorVal4.value
                          ? Number(fields.price.value) +
                            Number(fields.colorVal4.value)
                          : 0
                      }
                      type="number"
                      placeholder="0"
                      disabled
                    />
                    <p className="text-red-500">{fields.color4.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.color5.key}
                      name={fields.color5.name}
                      defaultValue={data.color5}
                      type="text"
                      placeholder="Color 5"
                    />
                    <p className="text-red-500">{fields.color5.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.colorVal5.key}
                      name={fields.colorVal5.name}
                      defaultValue={data.colorVal5}
                      type="number"
                      placeholder="Value 5"
                    />
                    <p className="text-red-500">{fields.colorVal5.errors}</p>
                  </div>
                  <div>
                    <Input
                      defaultValue={
                        fields.price.value && fields.colorVal5.value
                          ? Number(fields.price.value) +
                            Number(fields.colorVal5.value)
                          : 0
                      }
                      type="number"
                      placeholder="0"
                      disabled
                    />
                    <p className="text-red-500">{fields.color5.errors}</p>
                  </div>
                </div>
              </details>
            </div>

            <div className="flex flex-col gap-3">
              <details>
                <summary>Size Variants</summary>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 w-full">
                  <div>
                    <Label>Size 1</Label>
                    <Input
                      key={fields.size1.key}
                      name={fields.size1.name}
                      defaultValue={data.size1}
                      type="text"
                      placeholder="Size 1"
                    />
                    <p className="text-red-500">{fields.size1.errors}</p>
                  </div>
                  <div>
                    <Label>Extra Value</Label>
                    <Input
                      key={fields.sizeVal1.key}
                      name={fields.sizeVal1.name}
                      defaultValue={data.sizeVal1}
                      type="number"
                      placeholder="Value 1"
                    />
                    <p className="text-red-500">{fields.sizeVal1.errors}</p>
                  </div>
                  <div>
                    <Label>Total</Label>
                    <Input
                      defaultValue={
                        fields.price.value && fields.sizeVal1.value
                          ? Number(fields.price.value) +
                            Number(fields.sizeVal1.value)
                          : 0
                      }
                      type="number"
                      placeholder="0"
                      disabled
                    />
                    <p className="text-red-500">{fields.size1.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.size2.key}
                      name={fields.size2.name}
                      defaultValue={data.size2}
                      type="text"
                      placeholder="Size 2"
                    />
                    <p className="text-red-500">{fields.size2.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.sizeVal2.key}
                      name={fields.sizeVal2.name}
                      defaultValue={data.sizeVal2}
                      type="number"
                      placeholder="Value 2"
                    />
                    <p className="text-red-500">{fields.sizeVal2.errors}</p>
                  </div>
                  <div>
                    <Input
                      defaultValue={
                        fields.price.value && fields.sizeVal2.value
                          ? Number(fields.price.value) +
                            Number(fields.sizeVal2.value)
                          : 0
                      }
                      type="number"
                      placeholder="0"
                      disabled
                    />
                    <p className="text-red-500">{fields.size2.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.size3.key}
                      name={fields.size3.name}
                      defaultValue={data.size3}
                      type="text"
                      placeholder="Size 3"
                    />
                    <p className="text-red-500">{fields.size3.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.sizeVal3.key}
                      name={fields.sizeVal3.name}
                      defaultValue={data.sizeVal3}
                      type="number"
                      placeholder="Value 3"
                    />
                    <p className="text-red-500">{fields.sizeVal3.errors}</p>
                  </div>
                  <div>
                    <Input
                      defaultValue={
                        fields.price.value && fields.sizeVal3.value
                          ? Number(fields.price.value) +
                            Number(fields.sizeVal3.value)
                          : 0
                      }
                      type="number"
                      placeholder="0"
                      disabled
                    />
                    <p className="text-red-500">{fields.size3.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.size4.key}
                      name={fields.size4.name}
                      defaultValue={data.size4}
                      type="text"
                      placeholder="Size 4"
                    />
                    <p className="text-red-500">{fields.size4.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.sizeVal4.key}
                      name={fields.sizeVal4.name}
                      defaultValue={data.sizeVal4}
                      type="number"
                      placeholder="Value 4"
                    />
                    <p className="text-red-500">{fields.sizeVal4.errors}</p>
                  </div>
                  <div>
                    <Input
                      defaultValue={
                        fields.price.value && fields.sizeVal4.value
                          ? Number(fields.price.value) +
                            Number(fields.sizeVal4.value)
                          : 0
                      }
                      type="number"
                      placeholder="0"
                      disabled
                    />
                    <p className="text-red-500">{fields.size4.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.size5.key}
                      name={fields.size5.name}
                      defaultValue={data.size5}
                      type="text"
                      placeholder="Size 5"
                    />
                    <p className="text-red-500">{fields.size5.errors}</p>
                  </div>
                  <div>
                    <Input
                      key={fields.sizeVal5.key}
                      name={fields.sizeVal5.name}
                      defaultValue={data.sizeVal5}
                      type="number"
                      placeholder="Value 5"
                    />
                    <p className="text-red-500">{fields.sizeVal5.errors}</p>
                  </div>
                  <div>
                    <Input
                      defaultValue={
                        fields.price.value && fields.sizeVal5.value
                          ? Number(fields.price.value) +
                            Number(fields.sizeVal5.value)
                          : 0
                      }
                      type="number"
                      placeholder="0"
                      disabled
                    />
                    <p className="text-red-500">{fields.size5.errors}</p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Edit Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
