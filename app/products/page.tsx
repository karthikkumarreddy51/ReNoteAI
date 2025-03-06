"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Grid3X3, List } from "lucide-react"
import ProductCard from "@/components/product-card"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)

  // Mock products data
  const products = [
    {
      id: "1",
      name: "Air – AI-Powered Smart Reusable Notebook",
      description: "Smart Templates & AI Assistance",
      price: 24.99,
      discountedPrice: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "New Arrival",
      rating: 4.8,
      reviewCount: 124,
    },
    {
      id: "2",
      name: "Pro – Professional Smart Notebook",
      description: "Perfect for business professionals",
      price: 34.99,
      discountedPrice: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Best Seller",
      rating: 4.9,
      reviewCount: 256,
    },
    {
      id: "3",
      name: "Mini – Pocket Smart Notebook",
      description: "Compact and portable",
      price: 19.99,
      discountedPrice: 14.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Special Discount",
      rating: 4.7,
      reviewCount: 98,
    },
    {
      id: "4",
      name: "Executive – Premium Smart Notebook",
      description: "Luxury design with premium features",
      price: 49.99,
      discountedPrice: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Limited Edition",
      rating: 4.9,
      reviewCount: 87,
    },
    {
      id: "5",
      name: "Student – Academic Smart Notebook",
      description: "Designed for students and educators",
      price: 22.99,
      discountedPrice: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      status: null,
      rating: 4.6,
      reviewCount: 142,
    },
    {
      id: "6",
      name: "Architect – Drawing Smart Notebook",
      description: "Specialized for architects and designers",
      price: 39.99,
      discountedPrice: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      status: null,
      rating: 4.8,
      reviewCount: 76,
    },
    {
      id: "7",
      name: "Journal – Daily Smart Notebook",
      description: "Perfect for journaling and daily notes",
      price: 24.99,
      discountedPrice: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "New",
      rating: 4.7,
      reviewCount: 53,
    },
    {
      id: "8",
      name: "Kids – Children's Smart Notebook",
      description: "Designed for children with fun templates",
      price: 19.99,
      discountedPrice: 17.99,
      image: "/placeholder.svg?height=300&width=300",
      status: null,
      rating: 4.9,
      reviewCount: 112,
    },
    {
      id: "9",
      name: "Artist – Sketch Smart Notebook",
      description: "For artists and creative professionals",
      price: 29.99,
      discountedPrice: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      status: null,
      rating: 4.8,
      reviewCount: 94,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Smart Notebooks</h1>
          <p className="text-muted-foreground">Discover our range of innovative, reusable smart notebooks</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="md:hidden mr-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px] ml-2">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`md:w-1/4 lg:w-1/5 ${showFilters ? "block" : "hidden md:block"}`}>
          <div className="border rounded-lg p-4 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Filters</h2>
              <Button variant="ghost" size="sm">
                Reset
              </Button>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex items-center justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {["Professional", "Student", "Artist", "Journal", "Mini", "Kids"].map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox id={`category-${category}`} />
                      <Label htmlFor={`category-${category}`} className="ml-2 text-sm font-normal">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Page Types */}
              <div>
                <h3 className="font-medium mb-3">Page Type</h3>
                <div className="space-y-2">
                  {["Lined", "Dotted", "Grid", "Blank", "Mixed"].map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox id={`type-${type}`} />
                      <Label htmlFor={`type-${type}`} className="ml-2 text-sm font-normal">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-medium mb-3">Features</h3>
                <div className="space-y-2">
                  {["AI-Powered", "Cloud Sync", "Waterproof", "Premium Paper", "Extra Durable"].map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Checkbox id={`feature-${feature}`} />
                      <Label htmlFor={`feature-${feature}`} className="ml-2 text-sm font-normal">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply Filters Button (Mobile) */}
              <Button className="w-full md:hidden">Apply Filters</Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="sale">On Sale</TabsTrigger>
            </TabsList>
          </Tabs>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col sm:flex-row border rounded-lg overflow-hidden">
                  <div className="sm:w-1/3 aspect-square relative">
                    <Link href={`/products/${product.id}`}>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    {product.status && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                        {product.status}
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:w-2/3 flex flex-col">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-muted-foreground mb-2">{product.description}</p>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center mb-4">
                      {product.discountedPrice < product.price ? (
                        <>
                          <span className="font-bold text-lg">${product.discountedPrice.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="mt-auto flex gap-2">
                      <Button asChild>
                        <Link href={`/products/${product.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mr-2">
              Previous
            </Button>
            <Button variant="outline" className="mx-1">
              1
            </Button>
            <Button variant="outline" className="mx-1">
              2
            </Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <Button variant="outline" className="ml-2">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

