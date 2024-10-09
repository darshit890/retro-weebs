'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import debounce from 'lodash/debounce'
import { searchProducts } from '@/app/api/action'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SearchResult {
  id: string
  name: string
  price: number
  image: string
}

export default function SearchBar({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery) {
        setIsLoading(true)
        const searchResults = await searchProducts(searchQuery)
        setResults(searchResults)
        setIsLoading(false)
      } else {
        setResults([])
      }
    }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch(query)
    return () => {
      debouncedSearch.cancel()
    }
  }, [query, debouncedSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = async (productId: string) => {
    setShowSuggestions(false)
    setQuery('')
    onClose?.()
    
    const productUrl = `/product/${productId}`
    
    try {
      await router.push(productUrl)
    } catch (error) {
      console.error('Navigation failed:', error)
    }
  }

  const handleClose = () => {
    setQuery('')
    setResults([])
    setShowSuggestions(false)
    onClose?.()
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search products..."
          className="w-full pr-20"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-10 top-1/2 -translate-y-1/2"
            onClick={() => setQuery('')}
          >
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            Close
          </Button>
        )}
      </div>
      {isLoading && (
        <div className="absolute right-24 top-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        </div>
      )}
      {showSuggestions && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((product) => (
            <li
              key={product.id}
              className="px-4 py-2 hover:bg-muted cursor-pointer"
              onClick={() => handleSuggestionClick(product.id)}
            >
              <div className="flex items-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="mr-3 rounded-md"
                />
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}