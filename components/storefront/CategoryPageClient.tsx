'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Category } from '@prisma/client'
import { Product } from '@/app/(storefront)/category/page'
import { ProductCard } from './ProductCard'
import { FilterIcon, X } from 'lucide-react'
import SmoothSlider from '../ui/smooth-slider'

interface CategoryPageClientProps {
  initialProducts: Product[]
}

export default function Component({ initialProducts }: CategoryPageClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [colors, setColors] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)))
    setCategories(uniqueCategories)

    const uniqueColors = Array.from(new Set(products.flatMap(p => 
      [p.color1, p.color2, p.color3, p.color4, p.color5].filter(Boolean)
    )))
    setColors(uniqueColors)

    const uniqueSizes = Array.from(new Set(products.flatMap(p => 
      [p.size1, p.size2, p.size3, p.size4, p.size5].filter(Boolean)
    )))
    setSizes(uniqueSizes)
  }, [products])

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleColorChange = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value)
  }

  const filteredProducts = products.filter(product => 
    (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
    (product.price >= priceRange[0] && product.price <= priceRange[1]) &&
    (selectedColors.length === 0 || selectedColors.some(color => 
      [product.color1, product.color2, product.color3, product.color4, product.color5].includes(color)
    )) &&
    (selectedSizes.length === 0 || selectedSizes.some(size => 
      [product.size1, product.size2, product.size3, product.size4, product.size5].includes(size)
    ))
  )

  const FilterContent = () => (
    <div className="space-y-6">
      <FilterSection<Category>
        title="Categories" 
        items={categories} 
        selectedItems={selectedCategories} 
        onChange={handleCategoryChange} 
      />
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium mb-4 text-gray-700">Price Range</h3>
        <SmoothSlider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={handlePriceRangeChange}
        />
      </div>
      <FilterSection<string>
        title="Colors" 
        items={colors} 
        selectedItems={selectedColors} 
        onChange={handleColorChange} 
      />
      <FilterSection<string>
        title="Sizes" 
        items={sizes} 
        selectedItems={selectedSizes} 
        onChange={handleSizeChange} 
      />
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <FilterIcon className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FilterContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:block w-1/4">
          <div className="  bg-white p-6 rounded-lg shadow-md min-w-[15rem] xl:min-w-[18rem] max-h-[calc(100vh-2rem)] overflow-y-auto ">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Filters</h2>
            <FilterContent />
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface FilterSectionProps<T> {
  title: string
  items: T[]
  selectedItems: T[]
  onChange: (item: T) => void
}

function FilterSection<T extends React.ReactNode>({ title, items, selectedItems, onChange }: FilterSectionProps<T>) {
  return (
    <div className="border-t border-gray-200 pt-6 first:border-t-0 first:pt-0">
      <h3 className="font-medium mb-4 text-gray-700">{title}</h3>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item as React.Key} className="flex items-center">
            <Checkbox
              id={`${title}-${item}`}
              checked={selectedItems.includes(item)}
              onCheckedChange={() => onChange(item)}
              className="mr-2"
            />
            <label htmlFor={`${title}-${item}`} className="text-sm text-gray-600 cursor-pointer">
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}