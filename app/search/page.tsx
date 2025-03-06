"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useSearch } from "@/context/search-context"
import { searchProducts } from "@/lib/search"
import ProductCard from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const { searchQuery, setSearchQuery, searchResults, setSearchResults, isSearching, setIsSearching } = useSearch()

  useEffect(() => {
    if (query) {
      setSearchQuery(query)

      const fetchResults = async () => {
        setIsSearching(true)
        try {
          const results = await searchProducts(query)
          setSearchResults(results)
        } catch (error) {
          console.error("Search error:", error)
        } finally {
          setIsSearching(false)
        }
      }

      fetchResults()
    }
  }, [query, setSearchQuery, setSearchResults, setIsSearching])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>

      {isSearching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-[200px] w-full mb-4" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            ))}
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No products found matching your search.</p>
          <p>Try using different keywords or browse our product categories.</p>
        </div>
      )}
    </div>
  )
}

