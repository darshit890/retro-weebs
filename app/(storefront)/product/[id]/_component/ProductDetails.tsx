'use client'
import { useState } from "react"
import { StarIcon, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

interface Option {
  value: string
  label: string
  price: number
}

interface ProductDetailsProps {
  name: string
  description: string
  basePrice: number
  colorOptions: Option[]
  sizeOptions: Option[]
  addProductToShoppingCart: (formData: FormData) => Promise<{ success?: boolean; error?: string }>
}

export function ProductDetails({
  name,
  description,
  basePrice,
  colorOptions,
  sizeOptions,
  addProductToShoppingCart,
}: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState<Option>(colorOptions[0])
  const [selectedSize, setSelectedSize] = useState<Option>(sizeOptions[0])
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const router = useRouter()

  const totalPrice = basePrice + selectedColor.price + selectedSize.price

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsAddingToCart(true)
    try {
      const formData = new FormData(event.currentTarget)
      const result = await addProductToShoppingCart(formData)
      
      if (result.error) {
        toast.error(result.error)
        if (result.error === "User not authenticated") {
          router.push('/login') // Redirect to login page if user is not authenticated
        }
      } else if (result.success) {
        toast.success("Product added to cart")
        router.push('/bag')
      } else {
        toast.error("An unexpected error occurred")
      }
    } catch (error) {
      console.error("Error adding product to cart:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">{name}</h1>
        <div className="flex items-center justify-between mb-6">
          <p className="text-3xl font-bold text-gray-900">₹{totalPrice.toFixed(2)}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-sm text-gray-600">(4.5/5)</span>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="color" className="text-sm font-medium text-gray-700">
              Color
            </Label>
            <Select
              onValueChange={(value) =>
                setSelectedColor(colorOptions.find((option) => option.value === value) || colorOptions[0])
              }
            >
              <SelectTrigger id="color" className="w-full mt-1">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} {option.price > 0 && `(+₹${option.price.toFixed(2)})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="size" className="text-sm font-medium text-gray-700">
              Size
            </Label>
            <Select
              onValueChange={(value) =>
                setSelectedSize(sizeOptions.find((option) => option.value === value) || sizeOptions[0])
              }
            >
              <SelectTrigger id="size" className="w-full mt-1">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} {option.price > 0 && `(+₹${option.price.toFixed(2)})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-base text-gray-700 mb-6">{description}</p>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="color" value={selectedColor.value} />
          <input type="hidden" name="size" value={selectedSize.value} />
          <Button type="submit" className="w-full" disabled={isAddingToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> 
            {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}