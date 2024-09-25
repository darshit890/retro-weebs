'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import debounce from 'lodash/debounce';
import { searchProducts } from '@/app/api/action';

interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery) {
        setIsLoading(true);
        const searchResults = await searchProducts(searchQuery);
        setResults(searchResults);
        setIsLoading(false);
      } else {
        setResults([]);
      }
    }, 300),
    [searchProducts]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = async (productId: string) => {
    console.log('Suggestion clicked:', productId);
    setShowSuggestions(false);
    setQuery('');
    
    const productUrl = `/product/${productId}`;
    console.log('Navigating to:', productUrl);
    
    try {
      await router.push(productUrl);
      console.log('Navigation completed');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search products..."
        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {isLoading && (
        <div className="absolute right-3 top-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        </div>
      )}
      {showSuggestions && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((product) => (
            <li
              key={product.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleSuggestionClick(product.id);
              }}
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
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}